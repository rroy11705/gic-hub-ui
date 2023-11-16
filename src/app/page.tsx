'use client';

import clsx from 'clsx';
import Head from 'next/head';
import * as React from 'react';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';

enum CONVERSION_TOKENS {
  HORSE = 'H',
  ZEBRA = 'Z',
}

export default function HomePage() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');

  function toggleMode() {
    return mode === 'dark' ? setMode('light') : setMode('dark');
  }

  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const conversionOptions = React.useMemo(() => {
    return [
      { label: 'Select', value: undefined, disabled: true },
      { label: 'Horse', value: CONVERSION_TOKENS.HORSE, disabled: false },
      { label: 'Zebra', value: CONVERSION_TOKENS.ZEBRA, disabled: false },
    ];
  }, []);

  const [selectedFrom, setSelectedFrom] = React.useState<CONVERSION_TOKENS>();
  const [selectedTo, setSelectedTo] = React.useState<CONVERSION_TOKENS>();
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const handleSubmit = () => {
    const data = {
      selectedFrom: selectedFrom,
      selectedTo: selectedTo,
      selectedFile: selectedFile,
    };

    logger(data);
  };

  return (
    <main>
      <Head>
        <title>GIC - HUB</title>
      </Head>
      <section className={clsx(mode === 'dark' ? 'bg-dark' : 'bg-white')}>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='mt-8 flex flex-wrap gap-2'>
            <Button
              onClick={toggleMode}
              variant={mode === 'dark' ? 'light' : 'dark'}
            >
              Set to {mode === 'dark' ? 'light' : 'dark'}
            </Button>
            {/* <Button onClick={randomize}>Randomize CSS Variable</Button> */}
          </div>
          <h1 className={clsx('mt-4', textColor)}>GICHub</h1>
          <h4 className={clsx('mt-4', textColor)}>
            It is a Generative Adversarial Network (GAN) Image Conversion Hub
          </h4>
          <p className={clsx('mt-2 text-sm', textColor)}>
            GANs are a type of artificial intelligence model that can generate
            new data, such as images, based on patterns learned from existing
            data.
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            <ArrowLink href='https://github.com/Itachi1999/GICHub'>
              See the repository
            </ArrowLink>
          </p>

          <div className='my-8 flex w-full flex-col items-center justify-center gap-4'>
            <div className='flex w-1/2 flex-row items-center gap-4'>
              <div className='flex flex-1 flex-col items-start justify-start'>
                <label
                  htmlFor='select-from'
                  className={clsx(
                    mode === 'dark'
                      ? 'bg-dark text-white'
                      : 'text-dark-300 bg-white'
                  )}
                >
                  Select From
                </label>
                <select
                  name='select-from'
                  id='select-from'
                  value={selectedFrom}
                  className={clsx(
                    'block w-full max-w-xs rounded',
                    mode === 'dark'
                      ? 'bg-dark border text-white'
                      : 'text-dark-300 bg-white'
                  )}
                  onChange={(e) =>
                    setSelectedFrom(e.target.value as CONVERSION_TOKENS)
                  }
                >
                  {conversionOptions.map((c) => (
                    <option key={c.label} value={c.value} disabled={c.disabled}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-1 flex-col items-start justify-start'>
                <label
                  htmlFor='select-to'
                  className={clsx(
                    mode === 'dark'
                      ? 'bg-dark text-white'
                      : 'text-dark-300 bg-white'
                  )}
                >
                  Select To
                </label>
                <select
                  name='select-to'
                  id='select-to'
                  value={selectedTo}
                  className={clsx(
                    'block w-full max-w-xs rounded',
                    mode === 'dark'
                      ? 'bg-dark border border-gray-600 text-white'
                      : 'text-dark-300 border-gray-300 bg-white',
                    'focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring'
                  )}
                  onChange={(e) =>
                    setSelectedTo(e.target.value as CONVERSION_TOKENS)
                  }
                >
                  {conversionOptions.map((c) => (
                    <option key={c.label} value={c.value} disabled={c.disabled}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex w-1/2 flex-row items-center gap-4'>
              <div className='flex flex-1 flex-col items-start justify-start'>
                <label
                  htmlFor='choose-file'
                  className={clsx(
                    mode === 'dark'
                      ? 'bg-dark text-white'
                      : 'text-dark-300 bg-white'
                  )}
                >
                  Select To
                </label>
                <input
                  name='choose-file'
                  id='choose-file'
                  type='file'
                  className={clsx(
                    'block w-full max-w-xs rounded',
                    mode === 'dark'
                      ? 'bg-dark border border-gray-600 text-white'
                      : 'text-dark-300 border-gray-300 bg-white',
                    'focus:border-primary-400 focus:ring-primary-400 focus:outline-none focus:ring'
                  )}
                  onChange={(e) =>
                    setSelectedFile(
                      e.target.files ? e.target.files[0] : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>

          <Button
            className='flex w-1/2 items-center justify-center'
            variant='primary'
            onClick={handleSubmit}
          >
            Convert
          </Button>

          <footer className={clsx('absolute bottom-2', textColor)}>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://github.com/rroy11705'>
              Rahul Roy
            </UnderlineLink>{' '}
            &{' '}
            <UnderlineLink href='https://github.com/Itachi1999'>
              Soumya Nasipuri
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
