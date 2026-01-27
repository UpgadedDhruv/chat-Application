import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	// Use env vars so it works in both dev and production (e.g. Vercel)
	const SOCKET_URL =
		import.meta.env.VITE_SOCKET_URL ||
		import.meta.env.VITE_API_BASE_URL ||
		"http://localhost:5000";

	useEffect(() => {
		if (authUser) {
			const newSocket = io(SOCKET_URL, {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(newSocket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => newSocket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser, SOCKET_URL]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

