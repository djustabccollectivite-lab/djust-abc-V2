<template>
    <div class="dj-upload-dd" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input
            type="file"
            name="fields[assetsFieldHandle][]"
            id="assetsFieldHandle"
            class="dj-upload-dd-input"
            @change="onChange"
            ref="file"
            :accept="fileType"
        />

        <label for="assetsFieldHandle" class="dj-upload-dd-label">
            <div>{{ $t('fastCart.uploadDropzone') }}</div>
            <div class="pb-4">{{ $t('fastCart.fileTypes') }} <b>{{fileType.toUpperCase()}}</b></div>
            <div v-if="!this.filelist.length" class="inputfile">
                <i class="icon icon-folder"></i> {{ $t('fastCart.addFile') }}
            </div>
        </label>
        <ul class="mt-2 dj-upload-dd-label" v-if="this.filelist.length" v-cloak>
            <li class="dj-uplaod-fileList" v-for="(file, index) in filelist" :key="index">
                <b>
                    <u> {{ file.name }} </u>
                </b>
                <button
                    class="ml-2"
                    type="button"
                    @click="remove(filelist.indexOf(file))"
                    :title="$t('fastCart.rmFile')"
                >
                    <i class="icon icon-cross-circle"></i>
                </button>
            </li>
            <slot />
        </ul>

    </div>
</template>
<script>

export default {
    name: 'DjUploadDD',
    props: {
        fileToUpload: {
            type: Array,
            default: () => [],
        },
        fileType: {
            default: ".csv",
            type: String
        }
    },
    data() {
        return {
            filelist: this.fileToUpload ? this.fileToUpload : [],
        };
    },
    methods: {
        onChange() {
            this.filelist = [...this.$refs.file.files];
        },
        remove(i) {
            this.filelist.splice(i, 1);
            this.$refs.file.value = '';
        },
        dragover(event) {
            event.preventDefault();
            if (!event.currentTarget.classList.contains('is-dragover')) {
                event.currentTarget.classList.add('is-dragover');
            }
        },
        dragleave(event) {
            event.currentTarget.classList.add('is-dragover');
            event.currentTarget.classList.remove('is-dragover');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange();
            event.currentTarget.classList.remove('is-dragover');
        },
    },
    watch: {
        filelist: function () {
            this.$emit('load-file', this.filelist);
        },
    },
};
</script>
<style lang="scss">
.dj-upload-dd {
    padding: 6rem;
    background: #f9f9f9;
    border-width: 1px;
    border-color: #d1d5db;
    border-radius: 4px;
    outline: 2px dashed #9e9d9d;
}
.dj-upload-dd-input {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
}
.dj-upload-dd-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.dj-uplaod-fileList {
    list-style: none;
    padding-bottom: 10px;
}
.is-dragover {
    background-color: #f3f4f6;
    outline-offset: -10px;
    -moz-outline-radius: 4px;
}
[v-cloak] {
    display: none;
}

.inputfile {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    padding: 10px 24px;
    color: var(--color-secondary);
    background-color: white;
    display: inline-block;
    border: 1px solid var(--color-secondary);
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: var(--color-secondary);
        color: white;
    }
    &:focus {
        outline: 1px dotted var(--color-primary);
    }
    i {
        font-size: 14px;
        font-weight: 600;
    }
}
</style>
