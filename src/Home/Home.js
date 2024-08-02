import { useEffect, useMemo, useState } from "react";
import "./Home.scss"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowUpOnSquareIcon, Bars2Icon, Bars3Icon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const headers = {
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
}

const API = process.env.REACT_APP_API_URL

function Home() {
	const [data, setData] = useState([])
	const [offset, setOffset] = useState(0)
	const navigate = useNavigate()
	const [content, setContent] = useState('')

	const dataDisplay = useMemo(() => {
		let prevItem = {}
		return data?.map((item) => {
			if(item.date === prevItem.date) {
				item.sequence = true;
				prevItem.sequence = false;
			}
			prevItem = item;
			return item;
		}) || []
	}, [data])

  useEffect(() => {
		fetch(`${API}/msg?offset=${offset}`, {
			headers,
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
        if(res.detail) {
					toast.error(res.detail)
					// localStorage.removeItem("accessToken")
					// navigate("/login")
				}
				else {
					setData(res.msg)
				}

				// setData(res)
			})
			.catch(() => {
				console.log('error')
			})
			// .finally(() => setLoading(false))
	}, [])

	const sendMsg = () => {
		fetch(`${API}/msg?offset=${offset}`, {
			headers,
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
        if(res.detail) {
					toast.error(res.detail)
					// localStorage.removeItem("accessToken")
					// navigate("/login")
				}
				else {
					setData(res.msg)
				}

				// setData(res)
			})
			.catch(() => {
				console.log('error')
			})
	}

	return (
		<div className="home-container">
			<div className="list-note">
				{dataDisplay.map(e => (
					<div className="wrap" key={e.id}>
						{e.sequence && <div className="text-date">{e.date}</div>}
						<div className="note">
							<div className="content">{e.content}</div>
							{e.img && <img className="img" src={`${API}/uploads/${e.img}`} />}
						</div>
					</div>
				))}
			</div>
			<div>
				<button>
					<Bars2Icon width={24}/>
				</button>
				<button>
					<Bars3Icon width={24}/>
				</button>
				<button>
					<ArrowUpOnSquareIcon width={24}/>
				</button>
				<input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Note something..."/>
				<PaperAirplaneIcon width={24} onClick={sendMsg}/>
			</div>
		</div>
	);
}

export default Home;