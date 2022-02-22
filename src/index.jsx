import React from "react"
import {render} from "react-dom"
import { App } from "./app"
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import "./index.css"
if(process.env.NODE_ENV === "production"){
    disableReactDevTools()
}
render(<App />, document.getElementById("root"))