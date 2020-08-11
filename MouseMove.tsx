import React, { useState, useEffect } from 'react'

type MousePositionType = {
    x: number;
    y: number;
};

type WindowSizeType = {
    height: number;
    width: number;
};

const mathLib = { // no need to be a function - nothing gets in some way initialised
    distanceCalculator: ( point1: any, point2: any ): number =>
        Math.sqrt( Math.pow( point1.x - point2.x, 2 ) + Math.pow( point1.y - point2.y, 2 ) )
}

function App () {
    const [ mousePosition, setMousePosition ] = useState<MousePositionType>( { x: 0, y: 0 } )

    const [ windowSize, setWindowSize ] = useState<WindowSizeType>( {
        height: 0,
        width: 0,
    } )

    const handleMouseMove = ( e: { clientX: number; clientY: number } ) => {
        setMousePosition( { x: e.clientX, y: e.clientY } )
    }

    const handleResize = () => {
        setWindowSize( { height: window.innerHeight, width: window.innerWidth } )
    }

    useEffect( () => {
        window.addEventListener( 'mousemove', handleMouseMove )
        window.addEventListener( 'resize', handleResize )
        handleResize() // to get initial size without resizing // with my knowledge its not possible to do the same with mouseposition (no event, that contains info about that, fired)
        return () => { // gets called on unmount
            window.removeEventListener( 'mousemove', handleMouseMove ) // remove listeners to clean up (they could stack)
            window.removeEventListener( 'resize', handleResize )
        }
    }, [] ) // only happens on mount

    const distanceToCenter = mathLib.distanceCalculator( mousePosition, {
        x: windowSize.width / 2,
        y: windowSize.height / 2,
    } ) // as mousePosition forces a rerender anyway (and this is not a expensive calculation) we dont need to save it into state and force a extra rerender on every mousemove

    return (
        <>
            <div>
                Mouse Position: {mousePosition.x}:{mousePosition.y}
            </div>
            <div>
                Window Size: {windowSize.width}:{windowSize.height}
            </div>
            <div>Distance to center: {distanceToCenter.toFixed( 2 )}</div>
        </>
    )
}
export default App
