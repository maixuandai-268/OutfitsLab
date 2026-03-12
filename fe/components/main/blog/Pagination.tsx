import Link from "next/link"

export default function Pagination() {
    return (
        <div className="flex justify-center items-center gap-2 mt-10">

            <div className="flex gap-2 mt-10 justify-center">

                <Link href="/blog">1</Link>

                <Link href="/blog/page/2">2</Link>

                <Link href="/blog/page/3">3</Link>

                <Link href="/blog/page/4">4</Link>

                <Link href="/blog/page/5">5</Link>

            </div>

        </div>
    );
}