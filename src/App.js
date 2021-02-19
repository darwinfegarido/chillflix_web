import WebTorrent from 'webtorrent'
import {useState, useEffect} from 'react';

const client = new WebTorrent()

function App() {
  const [process, setProcess] = useState(0)
  const [vid, setVid] = useState()
  const [name , setName] = useState()
  const magnet = window.location.search

  useEffect(() => {
    client.add(`magnet:${magnet}&tr=wss%3A%2F%2Ftracker.openwebtorrent.com` ,(torrent) => {
        const file = torrent.files.find(file => file.name.endsWith('mp4'))
        file.appendTo('.video')
        console.log(file?.name)
        setInterval(() => setProcess(file.progress), 300)
    })
  }, [])

  client.on('error', console.log)
  return (
    <div className="App">
      <div className="video" >
      </div>
    </div>
  );
}

export default App;
