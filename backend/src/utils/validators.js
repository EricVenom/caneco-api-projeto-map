export function formatarCPF(cpf) {
  if (cpf) {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11) return null;
    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else {
    return null;
  }
}