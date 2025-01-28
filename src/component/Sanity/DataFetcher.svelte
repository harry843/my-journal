<script lang="ts">
    import { createClient } from '@sanity/client';
    import type { Writable } from 'svelte/store';
  
    export let query: string; // Query string to fetch
    export let onData: (data: any) => void; // Callback to send data to the parent
    export let store: Writable<any[]>;
  
    // Determine environment (localhost or staging)
    const dataset = import.meta.env.MODE === 'development' ? 'development' : 'production';
  
    const client = createClient({
      projectId: 'g2pdrwyj',
      dataset,
      useCdn: true,
      apiVersion: '2024-02-04',
    });
  
    // Function to fetch data
    async function fetchData(query: string) {
      const data = await client.fetch(query);
      store.set(data);
      onData(data); // Send data to the parent
    }
  
    // Refetch data whenever this component is reinitialized
    $: {
      fetchData(query);
    }
  </script>
  