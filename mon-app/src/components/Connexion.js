import '../App.css'
import {
    button,
    input,
    useState,
    useEffect,
} from 'react'
const InteractSmartContract = require('../InteractSmartContract');

export default function ConnexionButton(props) {
    const [usePrivateKey, setPrivateKey] = props.keys
    const [useAddress, setAddress] = useState("")
    const [useInputKey, setInputKey] = useState(null)

    useEffect(() => {usePrivateKey? 
        setAddress(InteractSmartContract.retrieveAddressFromPK(usePrivateKey)):console.log('Not Valie Key for Address')},
    [usePrivateKey]);
    
    const handlePrivateKeyInput = (pk, setInputKey) => {
        if (pk.length == 64) {
            console.log('Valid private key...')
            setInputKey(pk)
        }
    }
    return (
        <div className="connexionContainer">
            <div>
                <input 
                id="input_key"
                type="text"
                onChange={(e) => {handlePrivateKeyInput(e.target.value, setInputKey)}}
                placeholder='Enter Private Key' 
                >
                </input>
            </div>
            <button 
            style={{marginTop: "10px"}}
            onClick={() => {
                            setPrivateKey(useInputKey); 
                        }}
            > Sign In </button>
            <div style={{marginTop: "6px"}}> {'Address: '} </div>
            <div> {useAddress} </div>

        </div>
    )
}