import React from 'react';
import Image from 'next/image';
import Player1 from '@/assets/images/player-one.svg';
import Player2 from '@/assets/images/player-two.svg';
import {Player} from '@/libs';

type Props = {
    player: Player;
    score: number;
};
function DesktopPlayer(props: Props) {
    const image = props.player === Player.One ? Player1 : Player2;
    const text = props.player === Player.One ? '1' : '2';
    const margin = props.player === Player.One ? 'mr-[60px]' : 'ml-[60px]';

    return (
        <div
            className={`hidden lg:block border-shadow text-center bg-white px-[27px] pb-[17px] rounded-[20px] ${margin} mb-[200px]`}>
            <Image src={image} alt='player1' className='mx-auto mt-[-27px]' />
            <div className='md:text-head-s pt-[14px]'>PLAYER {text}</div>
            <div className='text-[32px] md:text-head-l'>{props.score}</div>
        </div>
    );
}

export default DesktopPlayer;
