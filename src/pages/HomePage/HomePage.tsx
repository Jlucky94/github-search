import React from 'react';
import {useSearchUsersQuery} from "store/github/github.api";

const HomePage = () => {
    const {isLoading,error,data} = useSearchUsersQuery('JLucky')
    return (
        <h1 className="text-3xl font-bold underline">Hello react</h1>
    )
}

export default HomePage;