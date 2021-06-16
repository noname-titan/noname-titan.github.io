import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"
import { XStudio, XBlank, XSection, XContent, XList, XText, XFooter } from "https://x-titan.github.io/xstudio/index.js"

const { is, each, getJSON, path, getBase64Image, EXTEND } = tools,
  { search, add, remove, styler } = DOM,
  $$ = document;

const xstudio = new XStudio("#app")

fetch("../../src/json/studio.json")
  .then(x => x.json())
  .then(xstudio.init)
  .then(imgList => {
    return [
      XSection({ id: "main" },
        XBlank(
          XText({
            tagName: "h1", notranslate: true
          }, "Titanium\nStudio")
        )
      ),
      XSection({ id: "about", css: "wrapper" },
        XList(
          XList({ listType: "row" },
            XText({ tagName: "h2" }, "My name is Aset.\nI'm based in Aktau, Kazakhstan."),
            XBlank({ css: "empty" })
          ),
          XList({ listType: "row" },
            XBlank({ css: "empty" }),
            XText({ css: "description", tagName: "p" }, "I am engaged in web development.")
          ),
          XList({ listType: "row" },
            XText({ css: "leftSide" }, "What can I do:"),
            XList({ css: "rightSide" },
              XText("Make a website for every taste."),
              XText("Create computer applications using Electron"),
              XText("Work in NodeJS")
            )
          ),
          XList({ listType: "row" },
            XText({ css: "leftSide" }, "What I'm studying:"),
            XList({ css: "rightSide" },
              XText("Development of native applications on React"),
              XText("Java programming")
            )
          ),
        )
      ),
      XFooter({ id: "footer" },
        XBlank({ css: "footer_grid", notranslate: true },
          XText({
            tagName: "a", css: "footer_email", href: "mailto:telmanov2002.at@gmail.com"
          }, "telmanov2002.at@gmail.com"),
          XList({ style: { gridArea: "Socials" } },
            XText({ tagName: "p" }, "— Socials"),
            XText({ tagName: "a", href: "https://www.facebook.com/ace.titan.404" }, "Facebook"),
            XText({ tagName: "a", href: "https://t.me/titanov" }, "Telegram"),
            XText({ tagName: "a", href: "https://vk.com/aset_telmanov" }, "VKontakte"),
            XText({ tagName: "a", href: "https://api.whatsapp.com/send?phone=+77788405404" }, "WhatsApp")
          ),
          XList({ style: { gridArea: "Githubs", paddingLeft: "0" } },
            XText({ tagName: "p" }, "— Github pages"),
            XText({ tagName: "a", href: "https://github.com/x-titan" }, "/x-titan"),
            XText({ tagName: "a", href: "https://github.com/titanium-studio" }, "/titanium-studio"),
          )
        )
      )
    ]
  })
  .then(xstudio.use)
  .then(xstudio.ready)
  .catch(XStudio.ERROR)
globalThis.xstudio = xstudio