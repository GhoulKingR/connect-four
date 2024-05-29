'use client';

import {
    Player,
    getWinningIndices,
    generateBlankBoard,
    makeMove,
    getCPUMove,
} from '@/libs';
import React, { useEffect, useRef, useState } from 'react';
import P1Background from '@/assets/images/turn-background-red.svg';
import P2Background from '@/assets/images/turn-background-yellow.svg';
import RedMarker from '@/assets/images/marker-red.svg';
import styled from 'styled-components';

type Props = {
    pause: boolean;
    addPoint: (player: Player) => void;
    playerWon: Player;
    setPlayerWon: (player: Player) => void;
    turn: Player;
    setTurn: (player: Player) => void;
    board: Player[];
    setBoard: (board: Player[]) => void;
    winingIndices: number[];
    setWiningIndices: (indices: number[]) => void;
    countDown: number;
    setCountDown: (num: number) => void;
};
function CPUBoard(props: Props) {
    const {
        board,
        setBoard,
        countDown,
        setCountDown,
        winingIndices,
        setWiningIndices,
    } = props;
    const timeout = useRef<NodeJS.Timeout>();
    const [hover, setHover] = useState(-1);
    const cpuTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (countDown === 0) {
            const oppositePlayer =
                props.turn === Player.One ? Player.CPU : Player.One;
            props.addPoint(oppositePlayer);
            props.setTurn(oppositePlayer);
        } else {
            timeout.current = setTimeout(() => {
                setCountDown(countDown - 1);
            }, 1000);
        }
        return () => clearTimeout(timeout.current);
    }, [countDown]);

    useEffect(() => {
        if (props.pause || props.playerWon !== Player.Neither) {
            clearTimeout(timeout.current);
            clearTimeout(cpuTimeout.current);
        } else {
            timeout.current = setTimeout(() => {
                setCountDown(countDown - 1);
            }, 1000);
        }
    }, [props.pause, props.playerWon]);

    useEffect(() => {
        if (
            !props.pause &&
            props.playerWon === Player.Neither &&
            props.turn === Player.CPU
        ) {
            cpuTimeout.current = setTimeout(
                () => {
                    const newBoard = [...board];
                    if (
                        makeMove(
                            Player.CPU,
                            getCPUMove(newBoard, Player.CPU),
                            newBoard,
                        )
                    ) {
                        setBoard(newBoard);
                        props.setTurn(Player.One);
                        const theWiningIndices = getWinningIndices(
                            newBoard,
                            Player.CPU,
                        );
                        if (theWiningIndices?.length === 4) {
                            clearTimeout(timeout.current);
                            props.setPlayerWon(Player.CPU);
                            setWiningIndices(theWiningIndices);
                        }
                    }
                },
                Math.min(
                    Math.floor(Math.random() * 100) % 10,
                    countDown > 1 ? countDown - 1 : 0,
                ) * 1000,
            );
        }
    }, [props.playerWon, props.turn, props.pause]);

    useEffect(() => {
        if (props.playerWon === Player.Neither) {
            setCountDown(30);
        }
    }, [props.turn]);

    useEffect(() => {
        if (props.playerWon !== Player.Neither) {
            props.addPoint(props.playerWon);
        }
    }, [props.playerWon]);

    return (
        <div className='col-span-3 pt-[32px]'>
            <div className='grid grid-cols-7 gap-[12px] mx-auto w-[335px] h-[310px] border-shadow bg-white rounded-[20px] px-[10px] pt-[10px] pb-[31.85px] md:w-[632px] md:h-[584px] md:rounded-[40px] md:pt-[20px] md:px-[20px] md:pb-[60px]'>
                {board.map((row, i) => {
                    const col = i % 7;
                    const topCellClass =
                        i === hover && props.playerWon === Player.Neither
                            ? props.turn === Player.One
                                ? 'top-cell-1'
                                : ''
                            : '';
                    return (
                        <Circle
                            key={i}
                            onMouseOver={() => setHover(col)}
                            onMouseLeave={() => setHover(-1)}
                            className={`rounded-full w-full h-full ${row === Player.Neither ? 'inner-purple-shadow' : row == Player.One ? 'player-one-circle' : 'player-two-circle'} flex justify-center items-center cursor-pointer ${topCellClass} relative`}
                            onClick={() => {
                                if (
                                    props.playerWon === Player.Neither &&
                                    props.turn === Player.One
                                ) {
                                    const newBoard = [...board];
                                    if (makeMove(props.turn, i % 7, newBoard)) {
                                        setBoard(newBoard);
                                        props.setTurn(Player.CPU);
                                        const theWiningIndices =
                                            getWinningIndices(
                                                newBoard,
                                                Player.One,
                                            );
                                        if (theWiningIndices?.length === 4) {
                                            clearTimeout(timeout.current);
                                            props.setPlayerWon(Player.One);
                                            setWiningIndices(theWiningIndices);
                                        }
                                    }
                                }
                            }}>
                            <div
                                className={`w-[20px] h-[20px] md:w-[34px] md:h-[34px] rounded-full ${winingIndices.indexOf(i) > -1 ? 'border-[6px] border-white' : ''}`}></div>
                        </Circle>
                    );
                })}
            </div>

            {props.playerWon === Player.Neither ? (
                <div
                    style={{
                        backgroundImage: `url(${
                            props.turn === Player.One
                                ? P1Background.src
                                : P2Background.src
                        })`,
                        color: props.turn === Player.One ? 'white' : 'black',
                    }}
                    className='mx-auto mt-[-25px] text-center bg-cover w-[191px] h-[160px] text-center pt-[41px] mb-[96px] md:mt-[-40px]'>
                    <div>
                        {props.turn === Player.One ? 'YOUR ' : "CPU'S "}
                        TURN
                    </div>
                    <div className='text-head-l'>{countDown}s</div>
                </div>
            ) : (
                <div className='bg-white border-shadow rounded-[20px] w-[285px] mx-auto py-[17px] text-center mt-[-15px] md:mt-[-40px]'>
                    <div className=''>
                        {props.playerWon === Player.One ? 'YOU' : 'CPU'}
                    </div>
                    <h1 className='text-head-l'>WON</h1>
                    <button
                        className={`py-[10px] px-[22px] bg-purple ${props.playerWon === Player.One ? 'hover:bg-red' : 'hover:bg-yellow'} rounded-full text-white`}
                        onClick={() => {
                            props.setPlayerWon(Player.Neither);
                            setCountDown(30);
                            setWiningIndices([]);
                            setBoard(generateBlankBoard());
                        }}>
                        PLAY AGAIN
                    </button>
                </div>
            )}
        </div>
    );
}

export default CPUBoard;

const Circle = styled.div`
    @media (min-width: 1064px) {
        &.top-cell-1::before {
            content: url(${RedMarker.src});
            position: absolute;
            top: -68px;
        }
    }
`;
