import { FC } from 'react'
import {Layout} from '../Layout/'
import { Button } from './assets/Button'
import  Hero  from './assets/Hero.png'
import { LeaderBoard } from './LeaderBoard'
export const Home : FC = () : JSX.Element =>{
    return (
        <Layout>
            <div className="flex flex-col items-center h-screen w-full sm:gap-y-8 gap-y-1">
                <div className='flex justify-center relative items-start pt-6 h-2/6 max-h-36 sm:max-h-96 w-[100vw] sm:h-3/4 sm:w-[90vw]'>
                    <img className='object-fit h-full w-full sm:px-12 px-4' src={Hero} alt="bg hero" />
                    <Button/>
                </div>
                <div className='flex justify-center relative items-start pt-6 h-3/6 sm:px-12 px-4 w-[100vw] sm:h-3/4 sm:w-[90vw]'>
                    <LeaderBoard/>

                </div>
                
            </div>

        </Layout>
    )
}