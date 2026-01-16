"use server";

import { cookies } from 'next/headers';
import { createServerClient } from '@/src/lib/supabase/server';
import { revalidatePath } from 'next/cache';

function getSupabase() {
	return createServerClient();
}

export async function getExperiments() {
	try {
		const supabase = getSupabase();
		const { data, error } = await supabase
			.from('experiments')
			.select('*')
			.in('status', ['draft', 'active'])
			.order('created_at', { ascending: false });
		if (error) throw error;
		return data;
	} catch (err: any) {
		console.error('Error cargando experiments (admin):', err);
		throw new Error(err?.message || 'No se pudieron cargar los experiments.');
	}
}

export async function createExperiment({ name, slug, description }) {
	const supabase = getSupabase();

	// Validar slug único
	const { data: existing } = await supabase
		.from('experiments')
		.select('id')
		.eq('slug', slug)
		.neq('status', 'archived');

	if (existing && existing.length > 0) {
		throw new Error('Slug must be unique');
	}

	const { error } = await supabase
		.from('experiments')
		.insert({
			name,
			slug,
			description,
			status: 'draft',
		});

	if (error) {
		throw new Error(error.message);
	}

	// Refrescar datos tras el insert exitoso
	revalidatePath("/explore/experiments-admin");
}

export async function archiveExperiment(id) {
	const supabase = getSupabase();
	const { error } = await supabase
		.from('experiments')
		.update({ status: 'archived' })
		.eq('id', id);
	if (error) throw error;
}

export async function updateExperiment({ id, name, description, status }) {
	const supabase = getSupabase();
	const { error } = await supabase
		.from('experiments')
		.update({ name, description, status })
		.eq('id', id);
	if (error) throw error;
}
