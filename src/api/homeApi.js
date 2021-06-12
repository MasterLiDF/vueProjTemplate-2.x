import request from '@/utils/http';

// export const login = () => request({
//     url:'/',
//     method:'get'
// })

export function login(){
    return request({
        url:'/',
        method:'get'
    })
}
