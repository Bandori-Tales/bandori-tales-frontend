/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: For theme changer */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import 'react-photo-view/dist/react-photo-view.css';
import './styles/globals.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';

import ErrorBoundaryComponent from './components/error/error-boundary-component';
import Loading from './components/helper/loading';
import { Toaster } from './components/ui/sonner';
import { animationSpeedScript } from './hooks/use-animation-speed';
import { GOOGLE_CLIENT_ID } from './lib/google-drive';
import { parseThemeCookie, registerTheme, ThemeProvider, themeScript } from './lib/theme';
import { cn } from './lib/utils';

function LoadingBar() {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const isLoading = navigation.state !== 'idle';

  const hideLoadingBar = ['yunogpt'].some((path) => pathname.includes(path)) ? 'hidden' : null;

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const timer1 = setTimeout(() => setProgress(30), 100);
      const timer2 = setTimeout(() => setProgress(60), 300);
      const timer3 = setTimeout(() => setProgress(80), 600);
      const timer4 = setTimeout(() => setProgress(90), 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }

    setProgress(100);
    const timer = setTimeout(() => setProgress(0), 200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (progress === 0 && !isLoading) return null;

  return (
    <div className={cn('fixed inset-x-0 top-0 z-50 h-1', hideLoadingBar)}>
      <div
        className="h-full bg-accent drop-shadow-black/20 drop-shadow-sm transition-all ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.ico',
    type: 'image/x-icon',
  },
  {
    rel: 'preload',
    href: '/fonts/Poppins-Regular.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Poppins-Medium.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/Poppins-Bold.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/RacingSansOne-Regular.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/font-yuruka-std.ttf',
    as: 'font',
    type: 'font/ttf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/fonts/angella-regular.otf',
    as: 'font',
    type: 'font/otf',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/images/spin_aya.webp',
    as: 'image',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/images/coming_soon.webp',
    as: 'image',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/images/error.webp',
    as: 'image',
    crossOrigin: 'anonymous',
  },
  { rel: 'preload', href: '/app/styles/globals.css', as: 'style' },
];

export function loader({ request }: Route.LoaderArgs) {
  return parseThemeCookie(request.headers.get('cookie'));
}

export function Layout({ children }: { children: React.ReactNode }) {
  const themeState = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en" {...registerTheme(themeState)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION}
        />
        <script
          id="ssr-themes"
          dangerouslySetInnerHTML={{
            __html: themeScript(),
          }}
        />
        <script
          id="transition-speed"
          dangerouslySetInnerHTML={{
            __html: animationSpeedScript(),
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <LoadingBar />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ThemeProvider initial={themeState}>{children}</ThemeProvider>
        </GoogleOAuthProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster position="top-center" visibleToasts={1} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryComponent {...props} />;
}

export function HydrateFallback() {
  return <Loading />;
}
