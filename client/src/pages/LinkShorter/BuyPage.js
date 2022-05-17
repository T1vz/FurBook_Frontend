import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinkList } from '../../components/LinkList'
import { Loader } from '../../components/Loader'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'

export const BuyPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async()=>{
        try {
            const fetched = await request('/api/link/buy', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
            
        }
    },[token, request])

    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])

    if (loading){
        return <Loader/>
    }
    return (
        <div>
            {!loading && <LinkList links={links}/>}
        </div>
    )
}