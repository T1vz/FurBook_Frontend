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
import {BuyPage} from "./pages/LinkShorter/BuyPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/profile/:id" exact>
                    <MainPage/>
                </Route>
                <Route path="/locator" exact>
                    <GameContainer/>
                </Route>
                <Route path="/chat" exact>
                    <ChatPage/>
                </Route>
                <Route path="/shop/items" exact>
                    <LinksPage/>
                </Route>
                <Route path="/shop/buy" exact>
                    <BuyPage/>
                </Route>
                <Route path="/shop/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/shop/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/profile/me"/>
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