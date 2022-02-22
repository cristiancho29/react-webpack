import { Suspense, lazy } from "react"
import {BrowserRouter,Routes, Route} from "react-router-dom"

import { Home } from "./pages/home"
import { MainLayout } from "./templates/main-layout"


const AboutUs = lazy(()=>import("./pages/about-us"))
const ContactUs = lazy(()=>import("./pages/contact-us"))
export const App = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path="about" element={<Suspense fallback={<p>...</p>}><AboutUs /></Suspense>}/>
                    <Route path="contact" element={<Suspense fallback={<p>...</p>}><ContactUs /></Suspense>}/>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}