import Link from 'next/link';
import { auth } from '../auth';

export default async function Home() {
  // const session = await auth();
  // console.log(session, '홈');
  return (
    <div>
      <main>Home page</main>
      <ul>
        <li className=" text-blue-600">
          <Link href="/login">로그인</Link>
        </li>
        <li className=" text-blue-600">
          <Link href="mypage">마이페이지</Link>
        </li>
      </ul>
    </div>
  );
}
