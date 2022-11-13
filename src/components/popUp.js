
export default function Pop(props) {

    return (
        <div className='popUp' style={{ top: `${props.y}px`, left: `${props.x}px` }}>
            {props.characters.map(char => {
                return (
                    <div key={Math.random()} style={{ height: `${100 / props.characters.length}%` }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'rgb(255, 10, 10)'
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = ''
                        }}
                        onClick={(e) => {
                            console.log('popup level', props.currentLevel)
                            // here i put one more condition (!== 148)  so that my levels with 1 waldo to find dont match this condition
                            if (props.positionArray.includes(props.clickPos) && props.clickPos === props.positionArray[0]
                                && props.positionArray.length === 3) {
                                if (e.target.textContent !== '> Odlaw') {
                                    props.callback(false, null);
                                } else {
                                    props.callback(false, 'odlaw');
                                }

                            } else if (props.positionArray.includes(props.clickPos) && props.clickPos === props.positionArray[1]) {
                                if (e.target.textContent !== '> Waldo') {
                                    props.callback(false, null);
                                } else {
                                    props.callback(false, 'waldo');
                                }

                            } else if (props.positionArray.includes(props.clickPos) && props.clickPos === props.positionArray[2]) {
                                if (e.target.textContent !== '> Wizard') {
                                    props.callback(false, null);
                                } else {
                                    props.callback(false, 'wizard');
                                }

                            } else if (props.positionArray.includes(props.clickPos) && props.clickPos === props.positionArray[0]
                                && props.currentLevel == 2) {
                                props.callbackLvl2(false, 'waldo');

                            } else if (props.positionArray.includes(props.clickPos) && props.clickPos === props.positionArray[0]
                            && props.currentLevel == 3) {
                                props.callbackLvl3(false, 'waldo');

                            } else {

                                if (props.currentLevel == 1) {
                                    props.callback(false, null);
                                }
                                if (props.currentLevel == 2) {
                                    props.callbackLvl2(false, null);
                                }
                                if (props.currentLevel == 3) {
                                    props.callbackLvl3(false, null);
                                }

                            }
                        }}>> {char}</div>
                )
            })}
        </div>
    )
}