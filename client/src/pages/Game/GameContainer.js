import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { GamePage } from './GamePage'
import {SetUserData, ConnectToServer, CreateNewGame} from '../../redux/gameReducer'
import { AuthContext } from '../../context/AuthContext'

// class GameC extends React.Component {
//     componentDidMount() {
//         const auth = useContext(AuthContext)
//         // let userid = this.props.match.params.userid 
//         // if (!userid) {
//         //     userid = this.props.activeUserId
//         //     if (!userid){
//         //         this.props.history.push('/login')
//         //     }
//         // }

//         // this.props.GetUserProfile(userid)
//         // this.props.GetStatus(userid)
//         console.log(this.props)

//         this.props.SetUserData({username:'loh', userId:11231})
//     }
//     render() {
//         return (
//             <div>
//                 <GamePage {...this.props}/>
//             </div>
//         )
//     }
// }
const GameC = (props) => {
    const auth = useContext(AuthContext)

    useEffect(()=>{
        props.SetUserData({username:auth.username, userId:auth.userId})
        props.ConnectToServer({userId:auth.userId})
    },[])

    const CreateGame = () => {
        props.CreateNewGame()
    }

    return(
        <div>
            <GamePage CreateGame={CreateGame} {...props} />
        </div>
    )
} 

let mapStateToProps = (state) => {
    return(
        {
            gameState: state.gamePage
        }
    )
}

const GameContainer = compose(connect(mapStateToProps, {SetUserData, ConnectToServer, CreateNewGame}),withRouter)(GameC)
export default GameContainer