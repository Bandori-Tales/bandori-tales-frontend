import { ButtonContent } from './contents/button-content';
import { InputContent } from './contents/input-content';
import { TextareaContent } from './contents/textarea-content';
import { ToastContent } from './contents/toast-content';

export async function clientLoader() {
  const response = await fetch('https://dummyjson.com/products/1');

  const data = await response.json();

  return { dummy: data };
}

export default function SandboxPage() {
  return (
    <main className="min-h-screen w-full px-12 py-6">
      <ButtonContent />

      <InputContent />

      <TextareaContent />

      <ToastContent />
    </main>
  );
}
