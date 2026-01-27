import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App, store } from "@/app"
import { Provider } from "react-redux"

const container = document.getElementById("root")

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { browserMockWorker } = await import("./app")

  return browserMockWorker.start({
    onUnhandledRequest: "bypass",
  })
}

async function init() {
  if (container) {
    const root = createRoot(container)

    await enableMocking()

    root.render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>,
    )
  } else {
    throw new Error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
  }
}

void init()
