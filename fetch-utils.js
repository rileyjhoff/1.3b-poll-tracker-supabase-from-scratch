const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobW93Z2N5YnRlcWdpd3dyeGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTQ2NjYsImV4cCI6MTk2MzU3MDY2Nn0.e8IeeowEcZ9C7aazuyONAepUhFvdOgDSLq8EKRJWwls';
const SUPABASE_URL = 'https://zhmowgcybteqgiwwrxln.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function signIn(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function signUp(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function getUser() {
    const user = client.auth.user();

    return user;
}

export async function getSession() {
    return client.auth.session();
}

export async function checkSession() {
    const user = await getSession();

    if (!user) {
        location.replace('../');
    }
}

export async function redirectToPolls() {
    if (await getSession()) {
        location.replace('./polls');
    }
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}