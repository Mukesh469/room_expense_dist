import { baseAPI } from "../../services/baseAPI";

export const roomAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRooms: builder.query({
            query: () => "/rooms",
            providesTags: ["Room"],
        }),

        createRoom: builder.mutation({
            query: (data) => ({
                url: "/rooms",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Room"],
        }),
    }),
});

export const {
    useGetRoomsQuery,
    useCreateRoomMutation,
} = roomAPI;