package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"runtime"
	"time"

	restful "github.com/emicklei/go-restful"
)

var (
	apiKey    string
	secretKey string
	ocrLog    *log.Logger
)

// 出错崩溃
func try(err error) {
	if err != nil {
		throw(err.Error())
	}
}

func lineNumberAt(deep int) string {
	fup, file, line, _ := runtime.Caller(deep + 1)
	fu := runtime.FuncForPC(fup)
	return fmt.Sprintf("%s(%s:%v)", fu.Name(), path.Base(file), line)
}

// 输出调用者
func lastCaller(msg string, deep int) string {
	return fmt.Sprintf("%s\n    at %s", msg, lineNumberAt(deep+1))
}

// 抛出错误
func throw(msg string) {
	panic(lastCaller(msg, 2))
}

// 供给panic后恢复 (部分内部错误无法恢复)
// exmaple:
// func xx() (err error){
//   defer util.Catch(&err)
//   ...
//   util.Try(err)
// }
//
func catch(err ...*error) {
	if e := recover(); e != nil {
		// es := fmt.Sprint(e)
		if err != nil && len(err) > 0 {
			*err[0], _ = e.(error)
		}
		// ERROR.Log(es)
	}
}

// OCRService 服务
type OCRService struct{}

// Register 注册
func (u OCRService) Register(container *restful.Container) {
	ws := new(restful.WebService)
	ws.
		Path("/ocr").
		Consumes("*/*").
		Produces("*/*")

	ws.Route(ws.POST("").To(u.OCR))

	container.Add(ws)
}

// OCR 识别文字
func (u OCRService) OCR(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json;charset=UTF-8")
	file, _, err := request.Request.FormFile("file")
	if err != nil {
		log.Println(err)
		io.WriteString(response.ResponseWriter, `{"result":[],"success":0,"msg":"图片格式不正确"}`)
		return
	}
	ocrrst, err := sogouOCR(file)
	if err != nil {
		log.Println(err)
		io.WriteString(response.ResponseWriter, `{"result":[],"success":0,"msg":"OCR错误"}`)
		return
	}
	ocrLog.Println(ocrrst)
	io.WriteString(response.ResponseWriter, ocrrst)
}

// 生成app签名函数
func signSogouOCR(ak, sk string) string {
	hst := "api.ai.sogou.com" // res["host"];
	uri := "/pub/ocr"         // res["path"];
	arg := ""

	pre := fmt.Sprintf("sac-auth-v1/%s/%d/3600", ak, time.Now().Unix())
	calc := fmt.Sprintf("%s\n%s\n%s\n%s\n%s", pre, "POST", hst, uri, arg)
	h := hmac.New(sha256.New, []byte(sk))
	io.WriteString(h, calc)
	return pre + "/" + base64.StdEncoding.EncodeToString(h.Sum(nil))
}

// 图片上传到搜狗服务器
func sougouUpload(file io.Reader) (rst string, err error) {
	defer catch(&err)
	api := "http://pic.sogou.com/pic/upload_pic.jsp"
	buf := new(bytes.Buffer)
	writer := multipart.NewWriter(buf)
	formFile, err := writer.CreateFormFile("pic", "pic.png")
	try(err)
	_, err = io.Copy(formFile, file)
	try(err)
	contentType := writer.FormDataContentType()
	writer.Close() // 发送之前必须调用Close()以写入结尾行
	res, err := http.Post(api, contentType, buf)
	try(err)
	bin, err := ioutil.ReadAll(res.Body)
	return string(bin), err
}

// SogouOCRResult 搜狗处理结果
type SogouOCRResult struct {
	Result []struct {
		Content string   `json:"content"`
		Frame   []string `json:"frame"`
	} `json:"result"`
	Success int `json:"success"`
}

// OCRResult OCR服务器返回值
type OCRResult struct {
	Result  []string `json:"result"`
	Success int      `json:"success"`
}

// 调用API识别图片
func sogouOCR(file io.Reader) (rst string, err error) {
	defer catch(&err)
	uploaded, err := sougouUpload(file)
	try(err)
	api := "http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + uploaded
	res, err := http.Get(api)
	try(err)
	bin, err := ioutil.ReadAll(res.Body)
	try(err)
	// 后处理
	rl := SogouOCRResult{}
	json.Unmarshal(bin, &rl)
	list := make([]string, 0, len(rl.Result))
	for _, v := range rl.Result {
		list = append(list, v.Content)
	}
	rs := OCRResult{Result: list, Success: 1}
	bin, err = json.Marshal(rs)
	return string(bin), err
}

// 用不来
func sogouAIOCR(file io.Reader) (rst string, err error) {
	api := "http://api.ai.sogou.com/pub/ocr"
	req, _ := http.NewRequest("POST", api, file)
	sign := signSogouOCR(apiKey, secretKey)
	req.Header.Set("Authorization", sign)
	log.Printf("Authorization: %s", sign)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return
	}
	bin, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return
	}
	return string(bin), err
}

// Config 设置文件
type Config struct {
	APIKey    string `json:"apiKey"`
	SecretKey string `json:"secretKey"`
}

func loadConfig() {
	var data Config
	file, _ := ioutil.ReadFile("config.json")
	json.Unmarshal(file, &data)
	apiKey = data.APIKey
	secretKey = data.SecretKey
	log.Printf("using apiKey: %s\n", apiKey)
}

func main() {
	loadConfig()
	logFile, err := os.Open("ocr.log")
	if err != nil {
		logFile, err = os.Create("ocr.log")
	}
	defer logFile.Close()
	if err != nil {
		log.Fatalln("open file error")
	}
	ocrLog = log.New(logFile, "[Info]", log.Llongfile)

	wsContainer := restful.NewContainer()
	servi := OCRService{}
	servi.Register(wsContainer)
	// Add container filter to enable CORS
	cors := restful.CrossOriginResourceSharing{
		AllowedDomains: []string{}, // allow *
		AllowedHeaders: []string{"Content-Type", "Accept"},
		AllowedMethods: []string{"POST"},
		CookiesAllowed: false,
		Container:      wsContainer}
	wsContainer.Filter(cors.Filter)

	log.Printf("start listening on localhost:8033")
	server := &http.Server{Addr: ":8033", Handler: wsContainer}
	log.Fatal(server.ListenAndServe())
}
