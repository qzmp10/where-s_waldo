import { useEffect } from "react"

export default function TimePop(props) {

    useEffect(() => {
        const header = document.querySelector('.header');
        const levelContainer = document.querySelector('.levelContainer');
        header.style.filter = 'blur(7px)';
        levelContainer.style.filter = 'blur(7px)';
    }, [])

    return (
        <div className='timePopUp'>
            <h1 className='timeToFinish'>
                You completed the level in {props.userTime} seconds!
            </h1>
            <h3>Register your time on the leaderboard!</h3>
            <form>
                <div className='inputDiv'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' />
                </div>
                <input type='submit' className='submit'/>

            </form>

        </div>
    )
}