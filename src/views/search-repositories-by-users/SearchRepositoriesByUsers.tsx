import './style.scss'
import { useAppContext } from '../../contexts'
import { Pagination, Loading } from '../../components'
import { useEffect } from 'react'
import Profile from './components/Profile'
import RepositoryList from './components/RepositoryList'
import useRequest, { IRequestOptions } from '../../hooks/apiService'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
export interface SearchRepositoriesByUsersProps {
}
 
const SearchRepositoriesByUsers = () => {
    const appContext = useAppContext()
    const [page, setPage] = useState<Number>(1)
    const requestParams: IRequestOptions = {
        method: 'GET',
        url: `${appContext.search.searchValue}/repos`,
        queryParams: {
            per_page: 8,
            page: page
        }
    }
    const [data, status, fetch] = useRequest(requestParams)

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        if(appContext.search.searchValue)
            fetch()
    }, [appContext.search.searchValue, page, fetch])

    window.onscroll = () => {
        console.log(window.scrollY, window.innerHeight, document.body.offsetHeight)
        if (window.scrollY >= document.body.offsetHeight) {
            console.log('end-page')
        }
    }

    if(data.length === 0)
        return <div className='home-logo'> <FaGithub /> </div>
    return (
        <div className='container-search-repositories-by-users'>
            <Profile 
                avatarUrl={data.length > 0 ? data[0].owner.avatar_url : ''}
                userGit={data.length > 0 ? data[0].owner.login : ''}
                urlGit={data.length > 0 ? data[0].owner.html_url : ''} />
            {status ? (
                <Loading />
            ) : <RepositoryList data={data} />}
            <div style={{backgroundColor: '#8b8b8b'}}></div>
            <Pagination page={page} setPage={setPage} />
        </div>
    )
}

export default SearchRepositoriesByUsers
