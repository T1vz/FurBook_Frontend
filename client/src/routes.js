import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import { CreatePage } from './pages/LinkShorter/CreatePage'
import { DetailPage } from './pages/LinkShorter/DetailPage'
import { LinksPage } from './pages/LinkShorter/LinksPage'
import { MainPage } from './pages/MainPage'
import { Provider } from 'react-redux';
import store from './redux/redux-store'
import GameContainer from './pages/Game/GameContainer'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/main" exact>
                    <MainPage/>
                </Route>
                <Route path="/game" exact>
                    <GameContainer/>
                </Route>
                <Route path="/chat" exact>
                    <ChatPage/>
                </Route>
                <Route path="/short1vz/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/short1vz/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/short1vz/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/main"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/auth" />
        </Switch>
    )
}