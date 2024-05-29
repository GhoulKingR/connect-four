import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import PvP from '@/assets/images/player-vs-player.svg';

export default function Home() {
    return (
        <main className='flex justify-center items-center h-screen w-screen'>
            <div className='mx-[20px] w-full max-w-[480px] md:px-[40px] md:pt-[70px] md:pb-[60px] md:shadow-classic md:rounded-[40px] md:border-[3px] md:border-black md:bg-purple'>
                <Image src={logo} alt='logo' className='mx-auto mb-[79px]' />

                <Link
                    href='/vs-player'
                    className='bg-yellow w-full justify-between flex items-center pl-[20px] pr-[17px] py-[13px] rounded-[20px] border-shadow mb-[30px] with-hover'>
                    <span className='tracking-0 text-head-m'>
                        PLAY VS PLAYER
                    </span>
                    <Image
                        src={PvP}
                        alt='Player vs player'
                        className='w-[82px] h-[46px]'
                    />
                </Link>

                <Link
                    href='/rules'
                    className='bg-white w-full justify-between flex items-center pl-[20px] pr-[17px] py-[20px] rounded-[20px] border-shadow mb-[30px] with-hover'>
                    <span className='tracking-0 text-head-m'>GAME RULES</span>
                    <div></div>
                </Link>
            </div>
        </main>
    );
}
