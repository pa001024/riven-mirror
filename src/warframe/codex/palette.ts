import _ from "lodash";

/**
 * 色板类
 */
export class Palette {
  id: string
  store: boolean
  colors: Color[]
  constructor({ id, store, colors }: { id: string, store: boolean, colors: string[] }) {
    [this.id, this.store] = [id, store];
    this.colors = colors.map(v => new Color(v));
  }
}

/**
 * 色板搜索结果类
 */
export class MatchedPalette extends Palette {
  match: number[]
  constructor({ id, store, colors }: Palette, matchedColors: PaletteColorInfo[]) {
    super({ id, store, colors: [] });
    this.colors = colors;
    this.match = [matchedColors[0].index];
  }
}

/**
 * 颜色类
 */
export class Color {
  r: number
  g: number
  b: number
  constructor(rgb: string | number[]) {
    if (typeof rgb === "string") {
    rgb = rgb.toLowerCase();
    if (rgb[0] === '#') rgb = rgb.substr(1);
    this.r = (rgb.charCodeAt(0) - 48) % 39 * 16 + (rgb.charCodeAt(1) - 48) % 39;
    this.g = (rgb.charCodeAt(2) - 48) % 39 * 16 + (rgb.charCodeAt(3) - 48) % 39;
    this.b = (rgb.charCodeAt(4) - 48) % 39 * 16 + (rgb.charCodeAt(5) - 48) % 39;
    } else {
      [this.r, this.g, this.b] = rgb;
    }
  }
  deltaE(cc: Color) {
    return (this.r - cc.r) ** 2 + (this.g - cc.g) ** 2 + (this.b - cc.b) ** 2;
  }
  toString() {
    return "#" + String.fromCharCode(this.r / 16 + (this.r / 16 < 10 ? 48 : 87)) + String.fromCharCode(this.r % 16 + (this.r % 16 < 10 ? 48 : 87))
      + String.fromCharCode(this.g / 16 + (this.g / 16 < 10 ? 48 : 87)) + String.fromCharCode(this.g % 16 + (this.g % 16 < 10 ? 48 : 87))
      + String.fromCharCode(this.b / 16 + (this.b / 16 < 10 ? 48 : 87)) + String.fromCharCode(this.b % 16 + (this.b % 16 < 10 ? 48 : 87));
  }
}

const _paletteData = [
  {
    id: "corpus",
    store: true,
    colors: [
      "E2F4F7", "B2D4E2", "75ADC8", "529ABF", "4093BF",
      "65F3FA", "63E1FA", "60C7F9", "5CABFA", "5991F9",
      "75DCFF", "4DCEE6", "19BEC7", "0DA7AC", "119298",
      "44C377", "3FB770", "39A566", "33945A", "2D8450",
      "ECD557", "D1CD37", "AFC40E", "67C40F", "19C820",
      "E5FF01", "DAF301", "CAE101", "B9CD01", "A8BB01",
      "F1D711", "E3CA10", "CCB60D", "B5A10B", "9F8D0A",
      "FFF37B", "F5EA75", "E7DB6E", "D6CC66", "C7BE5E",
      "E8BA57", "E0AA4B", "D59238", "C87825", "BD6012",
      "F8AE10", "EEA511", "E09711", "D08912", "C17B13",
      "DC491C", "CB431A", "B23B17", "973113", "7E2A0F",
      "ED6846", "E36140", "D45736", "C34A2D", "B34023",
      "FA6165", "F05357", "E23E43", "D2272C", "C31317",
      "BDA488", "B49C81", "A79178", "98846D", "8A7863",
      "616161", "585858", "4A4A4B", "3C3B3B", "2E2E2D",
      "5A5D68", "535761", "484E58", "3D444D", "323A44",
      "788A7D", "6F8074", "617165", "526055", "435248",
      "43316F", "3C2C63", "322453", "271C41", "1C142F",
    ],
  },
  {
    id: "dojo",
    store: true,
    colors: [
      "63779C", "6A7FA7", "728AB4", "809AC9", "8098C6",
      "919C3E", "A0AC44", "B2BF4D", "CBDB58", "CAD85A",
      "4F442B", "665B3E", "86785B", "AF9E7B", "BCAD8B",
      "23324F", "3C4F69", "5E798F", "87AABD", "9AC0CD",
      "23324F", "2F436A", "3F5B8F", "5377BC", "5E82CE",
      "344D47", "476861", "618E83", "7FBCAE", "8DCDBE",
      "009974", "00A880", "01BB8E", "00D9A3", "05D7A3",
      "4D1A09", "691F07", "8C2605", "99310F", "8B391E",
      "A58C30", "B09633", "BCA039", "D3B23E", "CCAE3F",
      "A69B85", "B1A68F", "BFB499", "D5C9AB", "D0C3A8",
      "5A39A7", "623EB4", "6A43C4", "774BDD", "774DDA",
      "4559A5", "4B5FB2", "5167BE", "5B73D6", "5B73D0",
      "790B12", "7C1319", "7E2024", "852D30", "7D3738",
      "28566F", "306785", "3C7EA2", "489BC9", "4FA4D2",
      "2A4E95", "33589B", "4165A1", "5176AC", "587AA4",
      "0E8AA3", "1795AF", "23A3BC", "2FB8D3", "3AB4CD",
      "A6662E", "B16D32", "BD7536", "D4833C", "CE813E",
      "A35C1E", "AF6B2F", "BD7F46", "D39962", "CE9F71",
    ],
  },
  {
    id: "grineer",
    store: true,
    colors: [
      "FFA339", "FF982B", "FF8D1E", "FF8312", "FF7B08",
      "FFCA6C", "FFC261", "FFB956", "FFAE48", "FFA33A",
      "B78427", "B37B23", "AE731F", "AA6C1B", "A86518",
      "C6A136", "C39B34", "C0932F", "BC8C2C", "B78327",
      "7E4226", "733D24", "693823", "613421", "5B3220",
      "AA542C", "A0502A", "954C29", "894627", "7E4126",
      "545D28", "4B5426", "454C24", "3F4622", "3A4121",
      "738030", "6C782E", "646F2D", "5B662A", "535D27",
      "779900", "6A8700", "5E7700", "546B00", "4C6100",
      "9BC700", "90BA00", "85AA00", "779800", "6A8800",
      "21AFC4", "1EA2B8", "1C96AE", "188DA6", "1786A0",
      "2FE1F1", "2CD6E7", "28C9DC", "25BCD0", "21AEC4",
      "418C87", "3C7C75", "386E65", "346156", "31594D",
      "4FB6B7", "4BAAA9", "479B99", "418C87", "3C7D75",
      "6B7066", "5F655E", "545B56", "4C5350", "454D4B",
      "9B9B88", "909180", "848778", "777B6F", "6B7066",
      "504941", "444039", "393631", "252521", "1F201D",
      "756A5E", "6D6358", "635A50", "585148", "4D4740",
    ]
  },
  {
    id: "infested",
    store: true,
    colors: [
      "1F8E00", "1B8600", "168000", "137A00", "0F7500",
      "2FA600", "2A9E00", "259600", "1F8E00", "1A8600",
      "41C100", "3CB800", "35AF00", "2FA700", "2A9E00",
      "52DA00", "4CD200", "46CA00", "41C100", "3BB800",
      "60F000", "5CE900", "57E200", "52DA00", "4DD200",
      "68E40A", "7DC426", "999A4B", "B76D74", "D5409A",
      "DE02C4", "E702C8", "F201CC", "F801CF", "FF00D2",
      "C904BB", "D503C0", "E002C4", "EA01C9", "F401CD",
      "9C07A7", "A906AE", "B605B3", "C205B9", "CF04BD",
      "86099F", "9208A4", "9F07A9", "AC06AF", "B906B5",
      "620C8F", "6B0C93", "750B97", "80099C", "8C09A1",
      "530B88", "480B83", "3D0A7E", "310978", "250872",
      "00057C", "000574", "00066C", "000665", "000660",
      "000499", "00048F", "000585", "00057D", "000674",
      "0003B8", "0003AD", "0004A3", "000498", "00048F",
      "0002D5", "0002CB", "0003C1", "0003B7", "0004AD",
      "0001ED", "0001E6", "0001DE", "0002D4", "0002CC",
      "0104FF", "0C1DFF", "1A3FFF", "2A64FF", "3884FF",
    ]
  },
  {
    id: "kiteer",
    store: false,
    colors: [
      "90FFDC", "81FAD6", "6CF3CD", "53EBC2", "38E3B7",
      "88FCD9", "75F6D0", "5DEEC6", "43E6BB", "29DDB1",
      "7DF9D4", "66F2CB", "4DE9C0", "33E0B5", "1BD8AC",
      "688F91", "638989", "5E7F7E", "577572", "506964",
      "658C8D", "608383", "5A7977", "526E69", "4C635C",
      "638788", "5C7D7C", "55726F", "4E6762", "485C55",
      "87BA9C", "80AF93", "759F87", "698D77", "5B7A68",
      "83B498", "79A68C", "6E957D", "61826E", "546F5F",
      "7DAC91", "739C83", "668974", "597665", "4D6557",
      "9F6544", "966041", "87573C", "774E37", "664431",
      "9A6243", "8D5B3F", "7D5239", "6D4834", "5C3E2E",
      "925E40", "84553C", "744C36", "624230", "53392B",
      "00D3E2", "00C5D4", "00B1BE", "009AA4", "00818A",
      "00CCDA", "00BAC7", "00A3AF", "008B95", "00727B",
      "00C2CF", "00ACB9", "0094A0", "007C85", "00666D",
      "609599", "57898C", "49777A", "396265", "2A4B4E",
      "5B8F92", "507F82", "406A6E", "305457", "213F41",
      "548589", "467376", "365E60", "274749", "183436",
    ]
  },
  {
    id: "lotus",
    store: true,
    colors: [
      "827DD3", "6B66C0", "4F4BA7", "363395", "1F1D77",
      "8882D8", "7570C8", "5B56B0", "413E9E", "27247D",
      "7E7C90", "6B6A7E", "555466", "3F3D51", "2C2A3B",
      "838296", "747286", "5E5C6E", "49475A", "333142",
      "686683", "56546E", "3F3D56", "2D2B41", "211F32",
      "706E8C", "5F5D7A", "4A4862", "36344C", "252337",
      "44527E", "3D4B76", "354169", "2B3860", "253052",
      "465480", "404E79", "38456E", "2E3C64", "263355",
      "3E4661", "373E5D", "2F3558", "282E53", "25294C",
      "414963", "3B425F", "343A5A", "2B3256", "262B4D",
      "A09DDE", "8885BE", "6A6896", "4E4D72", "34344C",
      "A7A3E6", "918FCB", "7573A4", "5A5981", "3C3B57",
      "BF92C3", "A77FAD", "87648D", "75527D", "563D5E",
      "C598C9", "B289B7", "97719E", "835D8B", "63466C",
      "6C79AE", "6370A1", "57648F", "4C5880", "404A69",
      "6F7DB3", "6775A8", "5B6894", "515D87", "424D6E",
      "98E0E6", "82C2CE", "6194A4", "508099", "39596F",
      "9DE7EB", "8BCFD8", "6EA7B7", "5A90A7", "406780",
    ]
  },
  {
    id: "orokin",
    store: true,
    colors: [
      "605D55", "6A675D", "76746A", "858376", "939283",
      "6B685E", "78756B", "878477", "949385", "A19F91",
      "B8A48D", "BAA690", "BEAB94", "C3B09B", "C8B4A1",
      "BAA68F", "BEAB94", "C2B09A", "C7B4A0", "CCB8A5",
      "9A9233", "A69D3C", "B5AC49", "C8BE56", "DAD066",
      "A59C3A", "B3AB47", "C6BC55", "D8CE64", "EAE073",
      "FFD10B", "FDD422", "FBD942", "F8DD67", "F6E38C",
      "FDD31E", "FBD83E", "F9DD62", "F6E288", "F4E7AC",
      "FFB90A", "FDBE1A", "FBC331", "F9C94A", "F7CE65",
      "FEBD17", "FCC22E", "F9C847", "F7CE62", "F5D37B",
      "EEEEDA", "F0F0DF", "F2F2E4", "F6F4EC", "F9F9F1",
      "F0F0DE", "F2F1E4", "F4F4EA", "F8F8F0", "FBFBF7",
      "54C9DB", "4CCEDF", "41D2E4", "36D8E9", "2BDDEF",
      "4FCBDD", "45D0E1", "3AD4E8", "2FDCED", "24E1F0",
      "0AB6E5", "17BBE8", "29C4EB", "3ECDEF", "54D6F3",
      "16BBE7", "27C3EA", "3BCCEF", "52D4F2", "66DEF7",
      "3A85BE", "2D9AC5", "36AED2", "2EC2DD", "26D8E6",
      "309ECA", "34B1D4", "2DC7DE", "16E7EE", "0EFFF9",
    ]
  },
  {
    id: "tenno",
    store: true,
    colors: [
      "DCCC9A", "83684F", "919A9C", "01B36C", "3F7BC1",
      "6C6C6C", "567B8D", "D0D0D0", "F8CF6F", "064661",
      "BC9E65", "BABABA", "7D7B78", "F7780F", "FF7201",
      "B3B3B3", "535353", "686868", "9A2B23", "0158FF",
      "FFFFFF", "457D9E", "5D6C6F", "C4B388", "0234B7",
      "B0BDB8", "7D6F65", "277883", "B54542", "FFFFFF",
      "617B91", "7BBDD7", "6F4F3B", "2EFFF1", "48DAE1",
      "8398B0", "4F5461", "787880", "68373C", "FF8A01",
      "E9E4DA", "7D8894", "A06F50", "8A8580", "014BBF",
      "808080", "41423E", "54BCB0", "31B891", "0158FF",
      "ECE4DA", "42534E", "1F2D3C", "E9FB10", "01B8FF",
      "9E8F65", "4B6575", "EACD75", "BABABA", "0061F2",
      "728A9C", "E8E9D2", "524F4B", "AA8D9C", "460DAE",
      "FA4D40", "948F8D", "65615D", "4085CA", "005DFD",
      "4E4947", "EC7546", "0CBDB0", "F7E8B7", "FD682E",
      "788588", "4E4B46", "C66550", "F8E4C2", "280DAE",
      "41675C", "916F4F", "5D6153", "C18A3D", "F40000",
      "5D6572", "F6F2E4", "6CB3F7", "E87D96", "80B7E2",
    ]
  },
  {
    id: "storm",
    store: true,
    colors: [
      "DF4019", "E45B39", "E56647", "F86F4D", "FF896A",
      "E66332", "E9784E", "EB835A", "FE8D61", "FFA986",
      "EFA55E", "F1B173", "F3B67D", "FFC58F", "FFD9B3",
      "F5C774", "F6CF87", "F7D390", "FFE1A7", "FFF1C4",
      "DEB76F", "E2C183", "E4C68C", "F6D697", "FFE7B5",
      "978B63", "A69C78", "ACA282", "BAB08C", "CDC59F",
      "5D6755", "747C6D", "7D8477", "878E81", "9BA394",
      "424A45", "5C635E", "676E69", "6F7772", "828A85",
      "121C21", "323A3F", "40484D", "454F54", "556065",
      "00020A", "1B2530", "2B333F", "2F3744", "3C4453",
      "100007", "351D28", "442D37", "49313C", "593F4C",
      "380001", "532124", "5F3133", "673537", "794345",
      "4D0000", "652020", "703030", "793434", "8C4242",
      "4F0A01", "672C24", "723B33", "7B4037", "8E4F45",
      "674800", "84651A", "8D702B", "98772E", "AD8C3C",
      "5D5C14", "737234", "7D7C42", "878647", "9A9957",
      "AE8B00", "B99B17", "BEA227", "CDAF2A", "E0C236",
      "FFAA00", "FFB600", "FFC90C", "FFD90D", "FFEB13",
    ]
  },
  {
    id: "easter",
    store: false,
    colors: [
      "CDA75E", "D0AF5F", "D1B35F", "DABB62", "DAC262",
      "CDB45E", "D0BD5F", "D1C15F", "DAC962", "DAD162",
      "B5AF59", "BDB85B", "C5C06D", "CDC970", "D8D373",
      "87AC5F", "A2BF83", "AEC793", "B6D099", "BEDB9F",
      "61AA8A", "83BCA4", "94C5AF", "99CEB7", "9FD8C0",
      "56A3A9", "76B5BC", "87BFC3", "8CC7CC", "92D1D6",
      "6DA5BC", "8DB8CB", "9BC1D1", "A2CBDB", "A9D4E5",
      "9FA9BF", "B4BCCD", "BEC4D3", "C7CEDE", "D0D8E9",
      "BEA5BE", "CBB9CC", "D2C2D3", "DCCBDD", "E8D5E9",
      "E4ABC5", "E9BED2", "ECC6D7", "F4CFE2", "F5D6EA",
      "E8A1C2", "EDB5D0", "EFBFD6", "F1C4DD", "F3CCE6",
      "CC81B4", "D79DC5", "DCAACC", "E6B0D5", "EEB7DF",
      "B261A7", "C384BA", "CB94C3", "D59ACC", "DFA0D6",
      "9754A0", "A963B1", "B477BB", "BC7BC3", "C57FCC",
      "8C5091", "9E54A2", "AB68AE", "B16BB4", "B96EBD",
      "99527C", "A95B92", "B470A1", "BC73A7", "C577AF",
      "A0546E", "AF5E88", "BA7397", "C2769D", "CB7AA3",
      "A85661", "B5617D", "BF768E", "C87A93", "D17E99",
    ]
  },
  {
    id: "ice",
    store: true,
    colors: [
      "78FFD4", "9BFFE1", "BBFFEB", "CEFFF9", "D5FDFF",
      "54D7C3", "74E1D1", "8CE8DC", "9BECE2", "A7FFF5",
      "07948B", "1EACA5", "32BDB7", "42C7C2", "47D7D2",
      "007474", "019191", "03A6A6", "06B3B3", "06C1C1",
      "005F63", "047E82", "0B9599", "13A4A7", "15B1B4",
      "003B47", "0D5B67", "1B7580", "288690", "2B919C",
      "012A39", "134A59", "246473", "337684", "37808F",
      "012431", "134351", "235C6B", "316E7C", "357786",
      "000C18", "0F2635", "1D3C4D", "2A4D5F", "2D5367",
      "00060F", "0D1B29", "1B2E40", "283E51", "2B4358",
      "001525", "0A3144", "16495D", "225B6F", "256278",
      "0084AE", "029FC1", "07B2CE", "0DBDD6", "0ECCE7",
      "00CAFF", "00D7FF", "00E0FF", "00E5FF", "00F7FF",
      "49B8AA", "69C9BE", "82D5CC", "92DCD4", "9EEEE5",
      "83B18F", "9EC4A7", "B1D1B9", "BDD8C4", "CCE9D4",
      "B1AE7E", "C4C199", "D1CEAD", "D8D6B9", "E9E7C8",
      "BDC6BE", "CDD4CE", "D8DED9", "DEE3DF", "F0F5F1",
      "C3D7E8", "D2E1EE", "DCE8F2", "E2ECF4", "F4FFFF",
    ]
  },
  {
    id: "classic",
    store: true,
    colors: [
      "461011", "671718", "952024", "BB282B", "D12E33",
      "3D181E", "58222A", "84333F", "AE4858", "CA576D",
      "200D15", "3B1B25", "713844", "AE616F", "D48897",
      "260A16", "3E1024", "6E1C3D", "9D275B", "BE317A",
      "0F1221", "161A34", "26305B", "3C498E", "5166B7",
      "081826", "0C2A44", "164777", "1E6EA8", "2490C6",
      "0E3345", "174961", "29728D", "3F9FB7", "55BFD2",
      "192E2A", "25453D", "3A695F", "54968B", "70BCB1",
      "112C18", "1A4626", "2C7940", "41A95E", "53C97C",
      "3A3B0B", "606412", "8F921F", "B8BA2C", "D1D037",
      "5A4629", "7F613A", "A98C50", "CEB56A", "E6D186",
      "7C411B", "925425", "AD7137", "C69650", "DDB66E",
      "9A3A1E", "B34F29", "CE723D", "E1A05A", "E8C381",
      "321709", "602911", "A44D1E", "D17426", "D79227",
      "291D1C", "4C3732", "8F685C", "C99F8E", "E4BFAD",
      "282724", "5D5A53", "BEBAAF", "F5F3EB", "FFFFFF",
      "202324", "474F4F", "96A4A4", "D6E1E1", "F3FBFA",
      "1D1E22", "3F434B", "8A8E9F", "C9CDDD", "E7EBF7",
    ]
  },
  {
    id: "fire",
    store: true,
    colors: [
      "FFDE93", "FFE3A4", "FFE9B6", "FFF0C4", "FFFCD1",
      "FFD457", "FFDB6C", "FFE384", "FFEA8E", "FFF79B",
      "FFC013", "FFCB20", "FFD633", "FFDF35", "FFEA3F",
      "FFA510", "FFB41C", "FFC32E", "FFCA30", "FFD738",
      "FF770A", "FF8914", "FF9E24", "FFA525", "FFB22D",
      "FF6208", "FF7411", "FF8B1F", "FF9120", "FF9F27",
      "E94300", "F55500", "FF6E07", "FF7412", "FF831F",
      "BA1A00", "C82700", "DB3B00", "E33E00", "F44700",
      "A00B00", "B01500", "C32300", "CB2500", "D92D00",
      "9B1B00", "B32700", "D13800", "D93B00", "EC4400",
      "993200", "B74200", "D35C0A", "DB5F0A", "E96B13",
      "9B4B00", "B2600A", "C67B21", "CE7F23", "DD8C2B",
      "7F3A00", "984E08", "AE681D", "B56B1D", "C47726",
      "501B00", "682C06", "824415", "874716", "95521C",
      "371000", "4F1C04", "6A3110", "6F3210", "7C3C17",
      "220C00", "351604", "4E2710", "512810", "5D3115",
      "080000", "150200", "2A0300", "460600", "570700",
      "121212", "2E2E2E", "606060", "9F9F9F", "C4C4C4",
    ]
  },
  {
    id: "twilight",
    store: true,
    colors: [
      "784712", "683B13", "562F13", "462314", "3B1B14",
      "A48B76", "846D5B", "614A3C", "412C21", "2B170E",
      "DCCF7F", "C0AD6C", "9F8757", "836544", "6F4E37",
      "E7DBBB", "D1B589", "BA8B53", "A46521", "964B00",
      "D2B48C", "C6A479", "B38C5E", "9F713F", "8C5924",
      "F5DEB3", "E0C99C", "C2AA7B", "9F8856", "816935",
      "C2B280", "B1A775", "999766", "7E8554", "667545",
      "E0A65D", "D78F4F", "CA703B", "BC4E26", "B03014",
      "CC7722", "C36522", "B54A21", "A72D21", "991220",
      "B791F8", "A77EE9", "9061D4", "7641BC", "5F24A7",
      "CD9FE3", "BD94DC", "A585D1", "8A74C5", "7265BA",
      "BB70E1", "A060C0", "814E9B", "663D7A", "533263",
      "B5AFF8", "A198DE", "8579BB", "685795", "4D3974",
      "AA5DE3", "9054CA", "744AAE", "5A4095", "483A84",
      "7E0AC7", "700EC1", "5C14B7", "461AAD", "3120A3",
      "5F0AC7", "510DB7", "3B129F", "241784", "0E1C6C",
      "9E16E1", "8610C0", "6B0A9B", "53047A", "430064",
      "B046E3", "8E34BB", "6A1F8E", "480D66", "32004A",
    ]
  },
  {
    id: "daybreak",
    store: true,
    colors: [
      "A0C6E8", "9BB7D9", "95A4C8", "8E91B5", "887EA3",
      "C491BA", "B888B1", "A57CA4", "916D95", "7E6188",
      "EFAED8", "E6A8D2", "DBA0CA", "CE98C1", "C390B9",
      "DB97CF", "D692CE", "CE8BCB", "C584C8", "BE7DC6",
      "FF84D2", "F985D0", "EF86CE", "E587CB", "DB88C9",
      "FFA8DF", "F5ACDA", "E7B1D4", "D7B7CD", "C8BCC6",
      "5F6A75", "7C858D", "9A9FA5", "B5B8BC", "CBCCCE",
      "495563", "656F7A", "828A92", "9FA5AA", "BABCC0",
      "354353", "4E5A67", "6B747F", "889097", "A5AAAF",
      "243445", "394856", "545F6C", "717A84", "8E959C",
      "C05531", "B85F41", "B06953", "A87464", "A07E76",
      "CA481B", "A9421D", "863B20", "653423", "492E25",
      "DB4C1A", "BE461C", "9B3F1F", "793821", "593123",
      "E94F19", "D04A1B", "B0431D", "8E3C20", "6B3522",
      "B74724", "A14429", "89402E", "713C33", "593938",
      "3B5B76", "34536E", "294761", "1E3A54", "132E47",
      "6489A6", "5E839E", "557A93", "4A6F87", "41667C",
      "A4D1F2", "96C1E1", "80A9C8", "698EAC", "537693",
    ]
  },
  {
    id: "valentine",
    store: false,
    colors: [
      "760303", "8B1717", "A22A2A", "B03B3B", "CA4545",
      "A50707", "B51C1C", "C53030", "CF4242", "EC4D4D",
      "BB0812", "C71E2A", "D43342", "DB4555", "F95164",
      "E60C2F", "EB2349", "F03964", "F34B77", "FF588A",
      "FF0D43", "FF245C", "FF3B77", "FF4E89", "FF5C9F",
      "FE1C50", "FE3468", "FE4D82", "FE6093", "FF70A9",
      "F46388", "F67A9C", "F893B0", "F9A3BD", "FFBCD9",
      "F08BA2", "F39DB2", "F6B1C3", "F8BECD", "FFDAEA",
      "E1768C", "E78B9E", "EDA2B2", "F0B0BE", "FFCADA",
      "AE363B", "BC4F54", "CB6A6F", "D47D82", "F29197",
      "9A1E1E", "AA3737", "BC5151", "C76464", "E37474",
      "9A2B2B", "AA4444", "BC5F5F", "C77272", "E38484",
      "9A4647", "AA5F60", "BC7A7B", "C78C8D", "E3A2A3",
      "9A5757", "AA6F6F", "BC8989", "C79A9A", "E3B1B1",
      "7F4445", "935D5E", "A97879", "B78A8B", "D2A0A1",
      "290B0B", "422121", "5D3737", "704949", "825656",
      "0F0000", "260C0C", "3D1A1A", "502828", "5E2F2F",
      "1F0000", "380E0F", "521D1E", "652C2D", "753334",
    ]
  },
  {
    id: "classicSaturated",
    store: true,
    colors: [
      "520406", "790507", "AF060B", "DC080D", "F60A11",
      "461019", "641622", "962132", "C53148", "E43D5E",
      "240914", "421423", "7E2C3D", "C05065", "E5778D",
      "2D0415", "490623", "810A3A", "B80D59", "DE127C",
      "0B0F25", "10163B", "1A2867", "2A3DA1", "3A58CE",
      "01192D", "002B51", "00488D", "0074C7", "009CEA",
      "023851", "075072", "137EA4", "25B0D2", "39D4EE",
      "15332D", "1E4C41", "307465", "46A595", "5FCDBD",
      "0B3215", "115022", "1B8A38", "2AC154", "39E474",
      "454600", "727700", "A8AC05", "D8DA0C", "F4F315",
      "65481E", "8F642B", "BD933C", "E5C154", "FCDE71",
      "923D06", "AB510D", "C8711D", "E19C36", "F6BE55",
      "B62B02", "D2420A", "EE6A1D", "FFA13C", "FFCA6A",
      "3C1400", "722300", "C24400", "F77100", "FF9C00",
      "2C1B19", "52332C", "9B6251", "D69981", "F0BBA1",
      "292823", "5F5B51", "C1BBAC", "F8F5E9", "FFFFFF",
      "1F2425", "455151", "93A7A7", "D4E4E4", "F1FDFC",
      "1C1D23", "3D424E", "858BA4", "C5CBE2", "E4EAFB",
    ]
  },
  {
    id: "eminence",
    store: false,
    colors: [
      "E6B0FE", "B7A1F6", "858BE9", "4C6CD3", "234DB9",
      "D6A3EC", "AA95E4", "7B80D8", "4865C7", "2249B1",
      "BD91D1", "9684CA", "6D73C0", "415CB4", "1F45A4",
      "A27CB3", "8070AC", "5F63A6", "39519F", "1D3F95",
      "886896", "6C5F91", "51558F", "32478C", "1A3988",
      "D0CCFE", "ADB6FB", "8545FE", "6B21FF", "6C648A",
      "BDB9E7", "9AA3DF", "793FE7", "5D1DDE", "5C5676",
      "A09DC4", "8188BB", "6735C4", "4917AD", "48435D",
      "83809F", "686F98", "542B9F", "34107A", "353144",
      "8685FF", "54529C", "596A9B", "4F3768", "563D77",
      "7876E4", "4B498C", "4F5D8A", "45305C", "4D376A",
      "6261BA", "3E3D74", "424D72", "39284C", "3F2C58",
      "4D4C92", "32315D", "353F5C", "2E203D", "312344",
      "7D48D8", "9078EA", "939EF8", "92CBF6", "96EAF5",
      "7241C5", "846ED7", "8690E3", "85B9E0", "88D5E0",
      "6438AB", "735FBB", "747DC3", "729EC0", "75B7BF",
      "533090", "5F4F9C", "6066A1", "5C819C", "60959C",
      "452777", "4E417F", "4C5281", "49667C", "4B767C",
    ]
  },
  {
    id: "shamrock",
    store: false,
    colors: [
      "FFD393", "FEC673", "FEB851", "FEAB31", "FDA015",
      "FFDAA3", "FECE86", "FEC165", "FEB344", "FDA625",
      "FFDFB1", "FFD598", "FEC979", "FEBB58", "FEAE37",
      "FF7700", "FF6600", "FF5400", "FF4300", "FF3400",
      "FF8000", "FF7100", "FF5F00", "FF4D00", "FF3D00",
      "FF8800", "FF7A00", "FF6A00", "FF5800", "FF4600",
      "4BEF6F", "3BDD5F", "2AC84D", "19B33C", "0BA22C",
      "54FA78", "47EB6B", "37D85B", "26C349", "16AF37",
      "58FF7D", "51F776", "43E668", "33D256", "22BD44",
      "03E02F", "05C82A", "07AE25", "09951F", "0B801B",
      "02ED32", "03D72D", "06BD28", "08A323", "0A8C1E",
      "01F734", "02E430", "04CD2B", "06B326", "099920",
      "27AA41", "2B923F", "307A3D", "33663B", "36583A",
      "24BB43", "28A441", "2C8C3F", "31753D", "34623B",
      "21C844", "25B543", "299E40", "2D863E", "326F3C",
      "1B1F75", "151870", "0F116A", "090A64", "03045F",
      "20267A", "1C2076", "161A71", "10136B", "0A0B65",
      "1351B2", "1044A4", "0B3190", "071E7B", "030C69",
    ]
  },
  {
    id: "smokeColors",
    store: true,
    colors: [
      "DDDEDE", "E0E2E2", "E4E5E5", "EFF0F0", "F9F9F9",
      "CBCDCD", "D2D3D3", "D8D9D9", "E4E5E5", "EFF0F0",
      "BDC0C0", "C4C7C7", "CBCDCD", "D7D8D8", "E0E2E2",
      "AEB1B2", "B7B9B9", "BEC1C1", "C9CCCC", "D3D4D4",
      "A3A6A7", "A7AAAB", "B1B3B3", "BCBEBE", "C3C6C6",
      "9B9D9F", "A0A2A3", "A3A6A7", "ADB0B1", "B5B7B7",
      "8C9091", "929596", "96999A", "9FA1A2", "A6A8AA",
      "767A7B", "7D8081", "808485", "898D8F", "929596",
      "656869", "6B6E70", "707475", "787D7E", "808485",
      "4D5154", "565A5B", "5B5F60", "626869", "696D6F",
      "404243", "464A4C", "4C4F51", "545758", "575B5C",
      "2F3132", "373B3C", "3D4041", "414446", "484C4D",
      "1F2222", "282B2C", "2E3031", "333536", "363A3B",
      "0F1111", "171A1A", "1C1F1F", "212324", "242729",
      "070B0B", "131515", "181A1A", "1B1E1E", "1E2020",
      "060707", "0F1111", "121515", "161818", "181B1B",
      "030404", "0B0C0C", "101111", "141515", "151616",
      "000000", "0A0B0B", "0D0F0F", "111212", "121414",
    ]
  },
  {
    id: "eximus",
    store: true,
    colors: [
      "697785", "5F6B79", "515C69", "434C57", "353D46",
      "E6D56F", "E5D16D", "E2C969", "E0C166", "DFBA64",
      "13B1E9", "14A8D7", "139BBF", "118CA3", "11808C",
      "CB2F2F", "C43232", "BA3434", "B03838", "A53A3B",
      "7FACB8", "749EAA", "688D97", "587882", "4C676F",
      "20EC14", "23DA13", "2AC213", "30A613", "368D12",
      "DECD9D", "D8C796", "CFC08D", "C5B982", "BCB179",
      "8ADE6B", "83D563", "78C557", "6DB64A", "63A93F",
      "ECDE14", "ECD714", "ECCD14", "ECC214", "ECB814",
      "F2F0E9", "E9F0E9", "DCEFEA", "CEEEEB", "C1EDEC",
      "6CB4F3", "67AFEE", "5FA7E6", "589FDE", "5097D5",
      "EC1414", "DB1414", "C21615", "A61716", "8D1718",
      "5B3F6E", "573969", "513361", "4A2A58", "442250",
      "A2BFA5", "96AF99", "839886", "6E7E70", "5C665E",
      "5AD168", "59CE74", "57C883", "54C194", "52BCA4",
      "F9F3EA", "F6ECDB", "F2E1C4", "ECD5AA", "E7CA94",
      "DCAA7F", "DAA171", "D79561", "D1884E", "CD7D3D",
      "EC9D14", "EC9814", "EC9014", "EC8714", "EC7E14",
    ]
  },
  {
    id: "gamma",
    store: false,
    colors: [
      "3E1718", "5C2223", "843033", "A73D3F", "BB4549",
      "381D22", "50292F", "783E46", "A05662", "BA6777",
      "1D1015", "361F26", "694048", "A46C76", "C9929D",
      "220E16", "381725", "632840", "8D385E", "AB457A",
      "11131E", "1B1E30", "2D3453", "485183", "5F6EA9",
      "0C1822", "14293C", "234769", "326C95", "3A88AF",
      "16313D", "224657", "376C7F", "5095A6", "66B3C0",
      "1C2B28", "29403A", "41635B", "5E8D85", "7AB1A9",
      "15281A", "214029", "376E45", "509B65", "64B981",
      "333411", "56591E", "80822F", "A5A63F", "BCBB4D",
      "534530", "766044", "9C875C", "C0AE78", "D9CA94",
      "6F4429", "835634", "9D7248", "B69361", "CDB17D",
      "89432F", "A0583C", "B97751", "CE9F6D", "D9BE8F",
      "2D190F", "552D1C", "915230", "B9763E", "BF8D40",
      "271F1E", "483835", "886C63", "C0A296", "DCC2B5",
      "272624", "5B5954", "BBB8B1", "F4F3ED", "FFFFFF",
      "202223", "484E4E", "98A2A2", "D8E0E0", "F4FAF9",
      "1E1E21", "414349", "8D909C", "CCCFDA", "EAEDF5",
    ]
  },
  {
    id: "twitch",
    store: false,
    colors: [
      "F7F6FB", "F9F8FD", "FAFAFC", "FCFCFC", "FEFEFE",
      "F1EEF7", "F3F0F7", "F4F3F9", "F7F4FB", "F9F7FC",
      "E8E4F2", "EBE7F5", "EDEAF5", "EFECF5", "F2EFF8",
      "E1DAEC", "E4DDEF", "E5E1F0", "EAE4F2", "EBE8F3",
      "D8D0E8", "DBD1E9", "DDD5EC", "DEDAEB", "E1DDEE",
      "CEC3E3", "D1C6E6", "D4CAE5", "D7CFE7", "DAD0E8",
      "C3B7DD", "C6BADE", "C9BEE0", "CCC1E1", "D0C5E3",
      "B9A9D8", "BEADD9", "C1B0DA", "C5B4DE", "C8B8DD",
      "AF9DCF", "B3A1D3", "B6A4D4", "B8A8D5", "BCADD8",
      "A490CB", "A794CC", "AB96CE", "AE9CD0", "B1A1D2",
      "9A84C4", "9D87C7", "A08AC8", "A48FCA", "A693CB",
      "9278BF", "927BC1", "957EC2", "9B82C4", "9C86C6",
      "876CB9", "8A70BA", "8D73BC", "9076BF", "9279BD",
      "7D61B6", "8064B8", "8368B7", "8868BB", "8A6EBB",
      "7557AF", "785AB0", "7A5CB2", "7D60B4", "8063B5",
      "6F4DAB", "7250AE", "7453AE", "7456AE", "7759AF",
      "6947A8", "6B49A8", "6D4BAA", "6F4DAB", "704EAC",
      "6441A5", "6542A6", "6745A6", "6947A8", "6B49A8",
    ]
  },
  {
    id: "bastille",
    store: false,
    colors: [
      "D92E2F", "DF3330", "E43731", "E93C33", "EF4135",
      "D2272C", "D72C2E", "DD312F", "E23531", "E63A33",
      "C92029", "CF242B", "D5292D", "DA2F2E", "DF3330",
      "C11827", "C71D29", "CC222A", "D2272C", "D82C2D",
      "BA1225", "BF1726", "C41B28", "C9202A", "CE252B",
      "B60E23", "B91124", "BC1525", "C11927", "C61E28",
      "F4F3F6", "F9F8FA", "FDFDFD", "FFFFFF", "FFFFFF",
      "EDEBF1", "F3F2F5", "F8F7F9", "FCFCFD", "FFFFFF",
      "E6E3EA", "EBE9EF", "F1F0F4", "F6F6F8", "FBFBFB",
      "DEDBE5", "E3E1EA", "EAE8EE", "F0EFF3", "F5F4F7",
      "D7D3DF", "DCDAE3", "E2E0E8", "E8E7EC", "EEEDF2",
      "D1CDDA", "D6D2DE", "DBD8E2", "E1DEE7", "E7E4EB",
      "003D80", "01458B", "004B95", "00519E", "0055A4",
      "013574", "013D80", "00448B", "014B96", "00519E",
      "012E68", "003674", "013D80", "00448B", "004C95",
      "01265D", "012E68", "003574", "003D80", "00458B",
      "002052", "01265D", "012E69", "013574", "003D80",
      "011A4A", "012052", "01265C", "012D68", "013574",
    ]
  },
  {
    id: "redWhiteBlue",
    store: false,
    colors: [
      "E11115", "FEFFFF", "E11115", "FFFFFF", "E11115",
      "DF1217", "FDFDFF", "E01116", "FEFEFF", "E11115",
      "DC1318", "FAFCFF", "DE1217", "FCFDFE", "DF1117",
      "D8141B", "F8FAFE", "DA1419", "F9FBFE", "DB1319",
      "D4161D", "F5F9FE", "D6151C", "F7F9FE", "D9141B",
      "D01721", "F2F6FD", "D2161F", "F5F8FD", "D5161D",
      "CC1924", "EFF4FC", "CE1822", "F1F6FD", "CF1721",
      "C71B26", "ECF2FC", "C91924", "EFF4FD", "CB1923",
      "C21C2A", "E9F1FC", "C51C28", "EBF2FC", "C71B26",
      "BE1E2C", "E6EEFC", "C01D2B", "E9F0FC", "C21C29",
      "BA202F", "E3ECFB", "BC1E2D", "E6EEFB", "BD1E2D",
      "B72031", "E0EBFA", "B82030", "E3ECFB", "BA1F2F",
      "B42133", "DFE9FB", "B52132", "E0EBFB", "B62032",
      "36428D", "374083", "393E7B", "3B3C75", "3C3B6F",
      "344394", "36418B", "383F83", "393E7A", "3B3C73",
      "32449B", "344392", "36418A", "383F81", "3A3D78",
      "3145A1", "324399", "354291", "364087", "383E7F",
      "3046A6", "3245A0", "334397", "35418F", "374085",
    ]
  },
  {
    id: "spektaka",
    store: false,
    colors: [
      "4CA1BE", "F16623", "E14E95", "F5981F", "6DA945",
      "539FB9", "F06427", "E1518E", "EE9922", "6BAB4B",
      "5A9BB1", "F0632E", "E3548A", "E79A24", "6BAA51",
      "6497A8", "EF6234", "E45782", "E09B24", "6BAA5B",
      "70959E", "EE603A", "E65C7E", "D89D29", "64AA62",
      "7B9095", "EE5E43", "E66277", "D09D2A", "64AA6B",
      "848D88", "EB5C4B", "E8676C", "C79E2C", "5EA674",
      "90887D", "EB5B53", "EB6C65", "BD9F2F", "60A97C",
      "9D8372", "E9585D", "EB725D", "B5A131", "5BA982",
      "A97F66", "E75665", "ED7654", "AAA233", "58A68E",
      "B47C5B", "E7556C", "EF7D4B", "A1A537", "53A596",
      "C07850", "E55475", "F1813F", "99A539", "50A59E",
      "CB7546", "E4517D", "F28737", "90A53C", "4FA5A6",
      "D5713D", "E24F85", "F68934", "88A83D", "4EA5AF",
      "DF6C33", "E24E8A", "F58F2B", "81A83E", "4CA3B6",
      "E76A2A", "E04D91", "F79226", "7AA93F", "4BA2BE",
      "ED6825", "E04C98", "F89424", "73AA42", "49A2C2",
      "F3661F", "DF4B99", "FA981D", "70AA43", "47A1C4",
    ]
  },
  {
    id: "halloween",
    store: false,
    colors: [
      "DE0000", "C30000", "A70000", "8C0000", "760000",
      "EB0000", "D30000", "B80000", "9C0000", "830000",
      "F70000", "E20000", "C90000", "AD0000", "920000",
      "FF7909", "FF6908", "FF5707", "FF4606", "FF3806",
      "FF8209", "FF7309", "FF6208", "FF5007", "FF4006",
      "FF890A", "FF7C09", "FF6C08", "FF5B07", "FF4A06",
      "FFD300", "FFC100", "FFAD00", "FF9C00", "FF8C00",
      "FFDC00", "FFCC00", "FFB900", "FFA600", "FF9500",
      "FFE300", "FFD600", "FFC400", "FFB100", "FFA000",
      "EBFF67", "DBFD2B", "C8FB00", "B9FA00", "ACF800",
      "F2FF87", "E3FF51", "D5FD11", "C3FA00", "B4FA00",
      "FBFFA2", "EDFF72", "DFFD37", "CAFB00", "BBFA00",
      "A4D56C", "93C34A", "85B527", "7AA805", "6E9D00",
      "ABE17C", "9CCD5F", "8CBD3C", "81AF19", "74A300",
      "B3EB8B", "A6DA71", "97C751", "8AB92E", "7CAB0C",
      "729E61", "618B4E", "51783C", "43682D", "3C5C23",
      "7AAB6C", "6D9A5C", "5E8649", "4D7338", "416429",
      "85B777", "78A769", "699557", "598145", "496F33",
    ]
  },
];

/**
 * 色板数据
 */
export const PaletteData = _paletteData.map(v => new Palette(v));


/**
 * 色板颜色信息
 */
export interface PaletteColorInfo {
  id: string
  index: number
  color: Color
}

/**
 * 颜色索引
 */
export class ColorHelper {
  public static instance = new ColorHelper();
  private _colorMap = new Map<string, PaletteColorInfo[]>();
  private _palette = new Map<string, Palette>();
  private _colors: Color[] = [];
  constructor() {
    PaletteData.forEach(v => {
      this._palette.set(v.id, v);
      v.colors.forEach((c, index) => {
        let ck = c.toString();
        if (this._colorMap.has(ck))
          this._colorMap.get(ck).push({ id: v.id, index, color: c });
        else {
          this._colorMap.set(ck, [{ id: v.id, index, color: c }]);
          this._colors.push(c);
        }
      });
    });
  }
  /**
   * 搜索颜色
   *
   * @param {(string | Color)} color 要搜索的颜色
   * @param {number} [deltaE=300] 容差
   * @memberof ColorHelper
   */
  static searchColor(color: string | Color, deltaE: number = 300) {
    let cc = typeof color === "string" ? new Color(color) : color;
    return this.instance._colors.filter(v => cc.deltaE(v) < deltaE).sort((a, b) => cc.deltaE(a) - cc.deltaE(b))
      .map(v => this.instance._colorMap.get(v.toString()))
      .reduce((a, b) => a.concat(b), []);
  }
  /**
   * 搜索包含指定颜色的色板
   *
   * @param {(string | Color)} color 要搜索的颜色
   * @param {number} [deltaE=300] 容差
   * @memberof ColorHelper
   */
  static searchPalette(color: string | Color, deltaE: number = 300) {
    let colors = this.searchColor(color, deltaE);
    let ps = _.groupBy(colors, v => v.id);
    return _.map(ps, (info, id) => new MatchedPalette(this.getPalette(id), info));
  }

  /**
   * 获取色板信息
   *
   * @param {string} id
   * @returns {Palette} 色板信息
   * @memberof ColorHelper
   */
  static getPalette(id: string) { return this.instance._palette.get(id); }
}
