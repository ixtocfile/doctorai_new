//import React, { useState, useStore, For } from 'react';
import * as React from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Datepicker from "react-tailwindcss-datepicker";
import axios from 'axios';

import { Image, FormInput } from "@components";

function News() {
const state = useStore({
          news: [
            {
              id: 1,
              title: "Breaking News 1",
              content: "Content for news 1...",
            },
            {
              id: 2,
              title: "Breaking News 2",
              content: "Content for news 2...",
            },
            {
              id: 3,
              title: "Breaking News 3",
              content: "Content for news 3...",
            },
            {
              id: 4,
              title: "Breaking News 4",
              content: "Content for news 4...",
            },
            {
              id: 5,
              title: "Breaking News 5",
              content: "Content for news 5...",
            },
          ],
        });
      
useStyle(`.builder-c87a335c61004dcb878a055be5f5e94c:hover {
          background-color: #e9e9e9
      }`);
      
return (
          <div>
            <div class="flex gap-5">
              <div
                $name="News Sidebar"
                class="overflow-y-auto p-5 rounded-lg bg-neutral-100 h-[600px] w-[300px] max-sm:w-full"
              >
                <h2 class="mb-5 text-xl">Latest News</h2>
                <For each={state.news}>
                  {(item, index) => (
                    <div
                      class="builder-c87a335c61004dcb878a055be5f5e94c p-4 border-b border-solid cursor-pointer border-b-zinc-300"
                      key={item.id}
                    >
                      <h3 class="mb-2 text-base">{item.title}</h3>
                      <p class="text-sm text-stone-500">{item.content}</p>
                    </div>
                  )}
                </For>
              </div>
              <div class="flex-1">
                <div
                  $name="Veille Sanitaire - Actualités ..."
                  class="box-border flex relative flex-col shrink-0 px-10 pt-7 pb-4 mx-0 mt-0 h-auto text-4xl bg-red-300 leading-[normal] max-sm:px-5 max-sm:text-2xl"
                >
                  <p>Veille Sanitaire - Actualités - Alertes Epidémies</p>
                </div>
                <Image
                  image="https://cdn.builder.io/api/v1/image/assets%2Fdf7b79a484fa453b8fbbf4f976ad815f%2F68d297db0ead4fc7841a08f275b40b55"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  class="box-border flex overflow-hidden relative flex-col shrink-0 mt-5 mb-0 w-full min-h-[20px] min-w-[20px]"
                  lazy={false}
                  fitContent={true}
                  aspectRatio={0.5}
                  lockAspectRatio={false}
                  height={306}
                  width={612}
                />
              </div>
            </div>
            <FormInput
              type="text"
              placeholder="Enter your Question"
              name="Question"
              defaultValue="Enter your Question"
              class="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300"
              required={false}
            />
          </div>
        );
      }
export default News;
/*
EXEMPLE QUASI CORRECT DE PAGE AVEC MENU : 
      <div className="w-full h-screen flex sm:flex-row flex-col">
      <Sidebar/>
            <p className="text-base font-semibold text-sky-950">200</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page trouvées !</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">La page est une page de test</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/' className="rounded-md bg-sky-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Se connecter</Link>
            <Link to='/' className="text-sm font-semibold text-gray-900">Contactez nous <span aria-hidden="true">&rarr;</span></Link>
            </div>
        </div>
*****************************************************************
Autre options :
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
          <div className="w-full h-full">
 <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
 */


// MENU DE BASE - IMPORT SIDEBAR
/*import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Datepicker from "react-tailwindcss-datepicker";
import axios from 'axios';

// CODE GENERER AVEC BUILDERIO :
import { useStore, For } from "../..";
import { Image, FormInput } from "@components";

export default function MyComponent(props) {
  const state = useStore({
    news: [
      {
        id: 1,
        title: "Breaking News 1",
        content: "Content for news 1...",
      },
      {
        id: 2,
        title: "Breaking News 2",
        content: "Content for news 2...",
      },
      {
        id: 3,
        title: "Breaking News 3",
        content: "Content for news 3...",
      },
      {
        id: 4,
        title: "Breaking News 4",
        content: "Content for news 4...",
      },
      {
        id: 5,
        title: "Breaking News 5",
        content: "Content for news 5...",
      },
    ],
  });

  useStyle(`.builder-c87a335c61004dcb878a055be5f5e94c:hover {
    background-color: #e9e9e9
}`);

  return (
    <div>
      <div class="flex gap-5">
        <div
          $name="News Sidebar"
          class="overflow-y-auto p-5 rounded-lg bg-neutral-100 h-[600px] w-[300px] max-sm:w-full"
        >
          <h2 class="mb-5 text-xl">Latest News</h2>
          <For each={state.news}>
            {(item, index) => (
              <div
                class="builder-c87a335c61004dcb878a055be5f5e94c p-4 border-b border-solid cursor-pointer border-b-zinc-300"
                key={item.id}
              >
                <h3 class="mb-2 text-base">{item.title}</h3>
                <p class="text-sm text-stone-500">{item.content}</p>
              </div>
            )}
          </For>
        </div>
        <div class="flex-1">
          <div
            $name="Veille Sanitaire - Actualités ..."
            class="box-border flex relative flex-col shrink-0 px-10 pt-7 pb-4 mx-0 mt-0 h-auto text-4xl bg-red-300 leading-[normal] max-sm:px-5 max-sm:text-2xl"
          >
            <p>Veille Sanitaire - Actualités - Alertes Epidémies</p>
          </div>
          <Image
            image="https://cdn.builder.io/api/v1/image/assets%2Fdf7b79a484fa453b8fbbf4f976ad815f%2F68d297db0ead4fc7841a08f275b40b55"
            backgroundSize="cover"
            backgroundPosition="center"
            class="box-border flex overflow-hidden relative flex-col shrink-0 mt-5 mb-0 w-full min-h-[20px] min-w-[20px]"
            lazy={false}
            fitContent={true}
            aspectRatio={0.5}
            lockAspectRatio={false}
            height={306}
            width={612}
          />
        </div>
      </div>
      <FormInput
        type="text"
        placeholder="Enter your Question"
        name="Question"
        defaultValue="Enter your Question"
        class="box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300"
        required={false}
      />
    </div>
  );
}*/