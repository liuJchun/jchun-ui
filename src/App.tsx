// import logo from "./logo.svg"
import './App.css'

import Upload from 'packages/Upload/index'
import Button from './packages/Button/index'

function App() {
    return (
        <div className="App">
            <Upload drag action="https://jsonplaceholder.typicode.com/posts" multiple>
                <Button>上传文件</Button>
            </Upload>
        </div>
    )
}

export default App
