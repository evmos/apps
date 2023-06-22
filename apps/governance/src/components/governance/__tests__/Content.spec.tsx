import { test } from 'vitest'
import { render } from '@testing-library/react'
import Content from '../Content'
import { vi } from 'vitest'

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";


const queryClient = new QueryClient()

vi.mock('next/router', async () => {
  return {
    useRouter() {
      return {
        query: {
          id: '1',
        },
      }
    },
  }
})

test('home', () => {
  const {debug} = render(
    <QueryClientProvider client={queryClient}>
      <Content />
       
       </QueryClientProvider>)
  debug()
})
