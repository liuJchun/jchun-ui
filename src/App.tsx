// import logo from "./logo.svg"
import "./App.css"

import Button from "./packages/Button"
import Menu from "packages/Menu"
import MenuItem from "packages/Menu/MenuItem"

function App() {
    return (
        <div className="App">
            <div>
                <h1>Menu</h1>
                <Menu>
                    <MenuItem index={0} disabled>
                        123
                    </MenuItem>
                    <MenuItem index={1}>123</MenuItem>
                    <MenuItem index={2}>1eee23</MenuItem>
                </Menu>
                <Menu mode="vertical">
                    <MenuItem index={0} disabled>
                        123
                    </MenuItem>
                    <MenuItem index={1}>123</MenuItem>
                    <MenuItem index={2}>1eee23</MenuItem>
                </Menu>
            </div>
            <div>
                <h1>Button test</h1>
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
        </div>
    )
}

export default App
