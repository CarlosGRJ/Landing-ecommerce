import React from 'react';

export const LocationSection = () => {
  return (
    <section
      id='ubicacion'
      className='w-full max-w-7xl mx-auto px-4 md:px-8 py-16'
      aria-labelledby='ubicacion-title'>
      <header className='mb-8 text-center'>
        <h2
          id='ubicacion-title'
          className='text-3xl md:text-4xl font-extrabold text-gray-900'>
          ¿Dónde estamos ubicados?
        </h2>
        <p className='mt-2 text-lg text-gray-700'>
          Ven a visitarnos en el corazón de la Ciudad de México.
        </p>
      </header>

      <div className='aspect-video w-full rounded-xl overflow-hidden shadow-md border'>
        <iframe
          title='Ubicación de Arigio Audio e Iluminación'
          src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235.16374932045545!2d-99.13841293639162!3d19.428818421404547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff000a35f501%3A0x525c3d6d93875013!2sARIGIO!5e0!3m2!1ses!2smx!4v1749754880255!5m2!1ses!2smx'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>
    </section>
  );
};
