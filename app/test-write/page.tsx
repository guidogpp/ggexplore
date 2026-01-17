import { redirect } from 'next/navigation';
export default function TestWriteRedirect() {
  return redirect('/internal/test-write');
}
