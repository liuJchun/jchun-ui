// import logo from "./logo.svg"
import './App.css'

import Menu from './packages/Menu'
import MenuItem from './packages/Menu/MenuItem'
import SubMenu from './packages/Menu/SubMenu'
import Icon from './packages/Icon'

function App() {
    return (
        <div className="App">
            <div>
                <Icon icon="coffee" size="10x" theme="danger"></Icon>
                <h1>Menu</h1>
                <Menu>
                    <MenuItem index={0} disabled>
                        123
                    </MenuItem>
                    <SubMenu title="sub-menu">
                        <MenuItem index={5}>5</MenuItem>
                        <MenuItem index={6}>6</MenuItem>
                        <MenuItem index={7}>7</MenuItem>
                        <MenuItem index={8}>8</MenuItem>
                        <MenuItem index={9}>9</MenuItem>
                    </SubMenu>
                    <MenuItem index={1}>123</MenuItem>
                    <MenuItem index={2}>1eee23</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default App
