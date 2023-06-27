import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

// This hook connects to websockets to receive notifications from the backend if data changes.
// It receives a callback function which is executed once per page load after initializing the WS connection.
// But first, it checks that userId is not undefined. As userId depends on another hook, this validation is made twice, first on load, then again when the other hook receives the data that includes userId.
// If userId is not undefined, the connection is established and the callback function is executed, that means event listeners are set.
// This pattern allows to define custom listeners per component/page, this may seem unpractical but they vary per component anyway.
// The purpose of this hook is to create the WS connection, not to handle the event listeners.
// We need to pass the userId when stablishing connection because the backend will join every connection with the same userId to the same room.
// When data changes, the backend will broadcast a 'data-update' event to every member of that room, in other words, every socket connection created using that same userId.

export function useWebsockets(
  callbackFn: (x: Socket) => void,
  userId: string | undefined
) {
  useEffect(() => {
    if (userId) {
      console.log(`WS connecting, userId: ${userId}`);
      const socket: Socket = io("http://localhost:3000", {
        query: {
          userId,
        },
      });
      callbackFn(socket);
    } else {
      console.log("WS not connected: userId was undefined");
    }
  }, [userId]);
}
