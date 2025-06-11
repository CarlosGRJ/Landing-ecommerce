'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LocationSection } from '@/components/sections/LocationSection';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(2, 'Tu nombre es requerido'),
  email: z.string().email('Correo inválido'),
  message: z.string().min(10, 'Mensaje muy corto'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <section
      id='contacto'
      className='w-full px-4 md:px-8 py-16 bg-white'
      aria-labelledby='contact-heading'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* Información */}
        <div>
          <header>
            <h2
              id='contact-heading'
              className='text-3xl font-bold text-gray-900 mb-4'>
              Contáctanos
            </h2>
            <p className='text-gray-700 mb-6'>
              ¿Tienes dudas o necesitas una cotización? Escríbenos o visítanos.
            </p>
          </header>

          <address className='not-italic space-y-4 text-gray-800'>
            <div>
              <strong>Correo:</strong>{' '}
              <a
                href='mailto:arigioiluminacion7@gmail.com'
                className='text-blue-600 hover:underline'>
                arigioiluminacion7@gmail.com
              </a>
            </div>
            <div>
              <strong>Teléfono / WhatsApp:</strong>{' '}
              <a
                href='https://wa.me/52155XXXXXXXX'
                className='text-green-600 hover:underline'
                target='_blank'>
                +52 55 XXXX XXXX
              </a>
            </div>
            <div>
              <strong>Horario:</strong> Lunes a Sábado de 10:00 a.m. a 7:00 p.m.
            </div>
            <div>
              <strong>Ubicación:</strong> República de El Salvador, Centro
              Histórico de la Ciudad de México, Colonia Centro, Cuauhtémoc, C.P.
              06000, Ciudad de México, CDMX.
            </div>
            <Link
              href='https://www.google.com/maps/dir/?api=1&destination=19.428762,-99.138435'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition'>
              Cómo llegar
            </Link>
          </address>
        </div>

        {/* Formulario */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='bg-white shadow-md rounded-xl p-6 space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder='Tu nombre' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='tucorreo@ejemplo.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder='Escribe tu mensaje...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white'>
                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>

              {form.formState.isSubmitSuccessful && (
                <p className='text-green-600 font-medium'>
                  ¡Mensaje enviado con éxito!
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Mapa */}
      <div className='mt-16'>
        <LocationSection />
      </div>
    </section>
  );
};
