'use client';

import React from 'react';
import Check from '@/assets/images/icon-check.svg';
import CheckHover from '@/assets/images/icon-check-hover.svg';
import Image from 'next/image';
import Link from 'next/link';

function page() {
    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <div className='rounded-[20px] border-shadow mx-[20px] w-full pt-[30px] px-[20px] bg-white max-w-[480px] md:px-[34px] md:rounded-[40px]'>
                <h1 className='text-head-l mx-auto text-center mb-[29px]'>
                    RULES
                </h1>

                <h2 className='text-purple text-head-s mb-[16px]'>OBJECTIVE</h2>

                <p className='medium text-body mb-[33px]'>
                    Be the first player to connect 4 of the same colored discs
                    in a row (either vertically, horizontally, or diagonally).
                </p>

                <h2 className='text-purple text-head-s mb-[16px]'>
                    HOW TO PLAY
                </h2>

                <section className='mb-[29px] md:mb-[22px]'>
                    <div className='flex mb-[10px]'>
                        <div className='mr-[19px]'>1</div>
                        <p className='medium'>
                            Red goes first in the first game.
                        </p>
                    </div>
                    <div className='flex mb-[10px]'>
                        <div className='mr-[17px]'>2</div>
                        <p className='medium'>
                            Players must alternate turns, and only one disc can
                            be dropped in each turn.
                        </p>
                    </div>
                    <div className='flex mb-[10px]'>
                        <div className='mr-[17px]'>3</div>
                        <p className='medium'>
                            The game ends when there is a 4-in-a-row or a
                            stalemate.
                        </p>
                    </div>
                    <div className='flex'>
                        <div className='mr-[17px]'>4</div>
                        <p className='medium'>
                            The starter of the previous game goes second on the
                            next game.
                        </p>
                    </div>
                </section>

                <div className='flex justify-center mb-[-32px]'>
                    <Link href='/'>
                        <Image
                            src={Check}
                            onMouseOver={(e) =>
                                (e.currentTarget.src = CheckHover.src)
                            }
                            onMouseLeave={(e) => [
                                (e.currentTarget.src = Check.src),
                            ]}
                            alt='check'
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default page;
