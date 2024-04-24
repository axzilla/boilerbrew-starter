import { UpdateEmailSchema } from '$lib/schemas';
import { type Actions } from '@sveltejs/kit';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(UpdateEmailSchema))
	};
};

export const actions: Actions = {
	forgotPassword: async ({ request, locals }) => {
		const form = await superValidate(request, zod(UpdateEmailSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const formData = form.data;
		try {
			await locals.pb.collection('users').requestPasswordReset(formData.email);
			return { form };
		} catch (err) {
			console.log('Error: ', err);
			return setError(form, '');
		}
	}
};
