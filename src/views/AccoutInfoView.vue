<script>
export default {
    data() {
        return {
            userData: null,
        };
    },
    created() {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                this.userData = JSON.parse(storedData);
            } catch (error) {
                console.error('Error al parsear los datos de usuario:', error);
            }
        }
    },
};
</script>

<template>
    <div class="container mt-5">
        <div v-if="userData" class="card">
            <div class="card-header text-center">
                <h1>Información de la Cuenta</h1>
            </div>
            <div class="card-body text-center">
                <img :src="userData.avatar" alt="Avatar" class="avatar img-thumbnail mb-3" />
                <p><strong>Nombre:</strong> {{ userData.name }}</p>
                <p><strong>Email:</strong> {{ userData.email }}</p>
                <p><strong>Rol:</strong> {{ userData.role }}</p>
            </div>
        </div>
        <div v-else class="alert alert-warning">
            <p>No se ha encontrado información de la cuenta.</p>
        </div>
    </div>
</template>

<style scoped>
.avatar {
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
</style>
