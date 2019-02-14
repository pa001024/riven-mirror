export const HMT = {
  eventTrigged(module: string, method: string, content: string) {
    if ("_hmt" in window && location.protocol === "https:")
      _hmt.push(["_trackEvent", module, method, content]);
  },
  pageViewed(path: string) {
    if ("_hmt" in window && location.protocol === "https:")
      _hmt.push(["_trackPageview", path]);
  },
  newMod(content: string) {
    HMT.eventTrigged("mod", "new", content)
  },
  newModOCR(content: string) {
    HMT.eventTrigged("mod", "ocr", content)
  },
  linkClick(content: string) {
    HMT.eventTrigged("link", "click", content)
  },
  langSelect(content: string) {
    HMT.eventTrigged("setting", "lang", content)
  },
}
