<script lang="ts">
  import { createClient } from '@sanity/client';
  import { writable, type Writable } from 'svelte/store';

  export let query: string; // Query string to fetch
  export let onData: (data: any) => void; // Callback to send data to the parent
  export let store: Writable<any[]> = writable([]); // Ensure it's always an array

  // Determine environment (localhost or staging)
  const dataset = import.meta.env.MODE === 'development' ? 'development' : 'production';

  const client = createClient({
      projectId: 'g2pdrwyj',
      dataset,
      useCdn: true,
      apiVersion: '2024-02-04',
  });

  // Function to fetch data safely
  async function fetchData(query: string) {
      try {
          const data = await client.fetch(query);
          store.set(data || []); // Ensure data is always an array
          onData(data); // Send data to the parent
      } catch (error) {
          console.error("Error fetching data:", error);
          store.set([]); // Prevent null values
      }
  }

  // Refetch data whenever query changes
  $: {
      if (query) fetchData(query);
  }
</script>
