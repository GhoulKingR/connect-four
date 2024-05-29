'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import logo from '@/assets/images/logo.svg';
import Player1 from '@/assets/images/player-one.svg';
import CPU from '@/assets/images/cpu.svg';
import CPUBoard from '@/components/CPUBoard';
import CPUDesktopPlayer from '@/components/CPUDesktopPlayer';
import { Player, generateBlankBoard } from '@/libs';
import Link from 'next/link';
import './style.css';

function page() {
    const [showMenu, setShowMenu] = useState(false);
    const [playersScore, setPlayersScore] = useState([0, 0]);
    const [playerWon, setPlayerWon] = useState(Player.Neither);
    const [turn, setTurn] = useState<Player>(Player.One);
    const [board, setBoard] = useState(generateBlankBoard());
    const [winingIndices, setWiningIndices] = useState<number[]>([]);
    const [countDown, setCountDown] = useState(30);
    const hoverColor = useMemo(() => {
        if (playerWon === Player.One) return 'hover:bg-red';
        else if (playerWon === Player.CPU) return 'hover:bg-yellow';
        else if (turn === Player.One) return 'hover:bg-red';
        else return 'hover:bg-yellow';
    }, [turn, playerWon]);

    function restart() {
        setPlayersScore([0, 0]);
        setShowMenu(false);
        setPlayerWon(Player.Neither);
        setTurn(Player.One);
        setBoard(generateBlankBoard());
        setCountDown(30);
        setWiningIndices([]);
    }

    return (
        <>
            <div
                className={`fixed bottom-0 w-screen left-0 rounded-t-[60px] h-[236px] ${playerWon === Player.Neither ? 'bg-dark-purple' : playerWon === Player.One ? 'bg-red' : 'bg-yellow'} z-[-1]`}></div>

            <nav className='mx-auto flex justify-between pt-[50px] items-center mb-[50px] w-[359px] md:w-[632px] md:mx-auto'>
                <button
                    onClick={() => setShowMenu(true)}
                    className={`w-[108px] h-[39px] bg-dark-purple rounded-full text-white ${hoverColor}`}>
                    MENU
                </button>
                <Image src={logo} alt='logo' className='w-[40px] h-[40px]' />
                <button
                    onClick={restart}
                    className={`w-[108px] h-[39px] bg-dark-purple rounded-full text-white ${hoverColor}`}>
                    RESTART
                </button>
            </nav>

            <main>
                <div className='mx-auto mb-[50px] md:mx-auto w-[359px] md:w-[632px] lg:w-[1054px] lg:flex lg:items-center'>
                    <div className='flex justify-between lg:hidden'>
                        <div className='flex py-[10px] border-shadow bg-white rounded-[20px] pr-[37px] ml-[27px] md:pr-[20px]'>
                            <Image
                                src={Player1}
                                alt='player1'
                                className='mr-[7px] md:mr-[17px] ml-[-27px]'
                            />
                            <div className='text-center md:flex md:items-center'>
                                <div className='md:pr-[20px] md:text-head-s'>
                                    YOU
                                </div>
                                <div className='text-[32px] md:text-head-l'>
                                    {playersScore[0]}
                                </div>
                            </div>
                        </div>
                        <div className='flex py-[10px] border-shadow bg-white rounded-[20px] pl-[37px] mr-[27px]'>
                            <div className='text-center md:flex md:flex-row-reverse md:items-center'>
                                <div className='md:pl-[20px] md:text-head-s'>
                                    CPU
                                </div>
                                <div className='text-[32px] md:text-head-l'>
                                    {playersScore[1]}
                                </div>
                            </div>
                            <Image
                                src={CPU}
                                alt='player2'
                                className='ml-[7px] md:ml-[17px] mr-[-27px]'
                            />
                        </div>
                    </div>

                    <CPUDesktopPlayer
                        player={Player.One}
                        score={playersScore[0]}
                    />
                    <CPUBoard
                        pause={showMenu}
                        playerWon={playerWon}
                        setPlayerWon={setPlayerWon}
                        winingIndices={winingIndices}
                        setWiningIndices={setWiningIndices}
                        turn={turn}
                        setTurn={setTurn}
                        board={board}
                        setBoard={setBoard}
                        countDown={countDown}
                        setCountDown={setCountDown}
                        addPoint={(player) => {
                            const p = player === Player.One ? 0 : 1;
                            const newScore = [...playersScore];
                            newScore[p]++;
                            setPlayersScore(newScore);
                        }}
                    />
                    <CPUDesktopPlayer
                        player={Player.CPU}
                        score={playersScore[1]}
                    />
                </div>
            </main>

            {showMenu && (
                <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center p-[20px]'>
                    <div className='w-full max-w-[480px] border-shadow mx-auto px-[20px] py-[30px] bg-purple rounded-[40px] md:px-[40px] md:py-[50px]'>
                        <h1 className='text-head-l text-white text-center mb-[30px]'>
                            PAUSE
                        </h1>

                        <button
                            onClick={() => setShowMenu(false)}
                            className='bg-white border-shadow w-full py-[21px] text-center text-head-m rounded-[20px] mb-[30px] with-hover'>
                            CONTINUE GAME
                        </button>
                        <button
                            onClick={restart}
                            className='bg-white border-shadow w-full py-[21px] text-center text-head-m rounded-[20px] mb-[30px] with-hover'>
                            RESTART
                        </button>
                        <Link
                            href='/'
                            className='block bg-red text-white border-shadow w-full py-[21px] text-center text-head-m rounded-[20px] with-hover'>
                            QUIT GAME
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default page;
