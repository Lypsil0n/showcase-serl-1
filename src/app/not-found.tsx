import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <p className='my-4'>The content you requested could not be found.</p>
            <p className='my-4 hover:text-cyan-500'><Link href='/'>Return to Homepage</Link></p>
        </div>
    );
}