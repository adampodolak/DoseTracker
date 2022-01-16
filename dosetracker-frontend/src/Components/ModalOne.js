import React from 'react'
import './ModalOne.css'
import SignUpForm from './SignUpForm'
import {motion} from 'framer-motion' 

function ModalOne({closeModalOne}) {
    return (
        <div className='ModalBackground'>
            <motion.div 
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                className='ModalContainer'>
                <div className='CloseButton'>
                <button onClick={() => closeModalOne(false)}>x</button>
                </div>
                <motion.div 
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity:1
                    }}
                    className='Form'>
                    <SignUpForm />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ModalOne
