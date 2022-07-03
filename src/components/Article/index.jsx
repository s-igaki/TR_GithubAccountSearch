import {
    useState
} from "react";

const Article = (props) => {
    const [user, setUser] = useState("");
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    const [note, setNote] = useState("");
    const [inputText, setInputText] = useState("");

    const handleInputTitle = (event) => {
        setInputText(() =>event.target.value);
    }
    const handleTitle = (input) => {
        console.log(input)
        fetch(`https://api.github.com/users/${input}`)
            .then((res) => {
                if(!res.ok) throw new Error(res.status);
                else return res.json();
            })
            .then((data) => {
                setId(data.id);
                setUrl(data.url);
                console.log(data);
            })
            .catch(err => {
                console.log("githubの処理に失敗");
                console.log(err);
                setId("");
                setUrl("");
                setNote("このアカウントは存在しません");
            });
        setUser(() => input);
    }

    return (
        <div>
            <h1>Search GitHubAccount</h1>
            <p>please input github user name and enter button!</p>
            <input
                value={inputText}
                onChange={handleInputTitle}
                />
            <button onClick={() => handleTitle(inputText)}>click</button>
            <p>アカウント名:{user}</p>
            <p>ID:{id}</p>
            <p>URL:{url}</p>
            <p>{note}</p>
        </div>
    );
}

export default Article;
