import logo from "./logo.svg"
import "./App.css"

import Button from "./packages/Button"

function App() {
    return (
        <div className="App">
            <Button disabled>sdf</Button>
            <Button disabled btnType="link">
                sdf
            </Button>
            <br></br>
            button size
            <br></br>
            <Button size="large" btnType="primary">
                Large Primary
            </Button>
            <Button>Middle</Button>
            <Button size="small">Small</Button>
            <Button size="large" btnType="danger">
                Large danger
            </Button>
            <br></br>
            Disabled
            <br></br>
            <Button size="large" disabled btnType="danger">
                Large danger disabled
            </Button>
            <Button size="large" disabled btnType="link">
                Large link disabled
            </Button>
            <Button btnType="link">Large link</Button>
            <Button
                href="wwww.baidu.com"
                btnType="link"
                disabled
                onClick={() => {
                    console.log("-----")
                }}
            >
                href baidu link
            </Button>
        </div>
    )
}

export default App
