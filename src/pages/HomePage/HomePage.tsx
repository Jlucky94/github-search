import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "store/github/github.api";
import {useDebounce} from "hooks/debounce";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;
import RepoCard from "components/RepoCard";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropDown, setDropDown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropDown(false)
    }

    useEffect(() => {
        setDropDown(debounced.length > 3 && data?.length! > 0)
    }, [debounced, data])

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-600">Something went wrong...</p>}

            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[43px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => setSearch(e.currentTarget.value)}
                />
                {dropDown && <ul
                    className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                    {isLoading && <p className="text-center">Loading... </p>}
                    {data?.map(user => (
                        <li
                            onClick={() => clickHandler(user.login)}
                            key={user.id}
                            className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                        >
                            {user.url}
                        </li>
                    ))}
                </ul>}
                <div className="container">
                    {areReposLoading && <p className="text-center">Repos are loading...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
                </div>
            </div>
        </div>
    )
}

export default HomePage;